import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { entries } from "../component/redux";
import Fetcher from "../component/server";
import Updater from "./updater";
import Read from "./read";
import ReadTable from "./readTable";
import TableNav from "../navs/tableNav";
import db from "../component/dbaccess";
import SnackBar from "../component/snackBar";
import { onEdit, onRead, onWrite, onView } from "../component/redux";

const mapStateToOnlineReader = state => {
  const journalid = state.journalId;
  const { read, edit } = state;
  const myJournal = { ...state.onlineJournal };
  return { myJournal, read, edit, journalid };
};

const mapDispatchToOnlineReader = dispatch => ({
  entries: data => dispatch(entries(data)),
  onRead: data => dispatch(onRead(data)),
  onEdit: data => dispatch(onEdit(data)),
  onWrite: () => dispatch(onWrite()),
  onView: () => dispatch(onView())
});

class OnlineReaderConstruct extends Component {
  state = {
    status: false,

    msg: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.myJournal.journalid !== prevProps.myJournal.journalid) {
      //this.updateStore();
    }
  }

  onDelete = data => {
    this.props.onView();
    this.setState({ status: true });
    const appData = {
      ...data,
      journalid: this.props.myJournal.journalid,
      submit: "DELETEENTRY"
    };

    Fetcher(appData, "DELETE")
      .then(res => {
        if (res.value === false) {
          //console.log(res);
          throw new Error("false value");
        } else {
          db.savedEntries
            .where("entryid")
            .equals(data.entryid)
            .delete();
          this.setState({ status: false, msg: "Deleted" });
          $("#snackBarTrigger").trigger("click");
          this.props.fetchList();
        }
      })
      .catch(err => {
        this.setState({ status: false, msg: "Delete failed" });
        $("#snackBarTrigger").trigger("click");
        //console.log(err);
      });
  };

  onUpdate = data => {
    this.setState({ status: true });

    const appData = {
      ...data,
      journalid: this.props.myJournal.journalid,
      submit: "UPDATEENTRY"
    };

    Fetcher(appData, "PUT")
      .then(res => {
        if (res.value === false) {
          //console.log(res);
          throw new Error("false value");
        } else {
          this.setState({ status: false, msg: "updated" });
          $("#snackBarTrigger").trigger("click");
          this.props.fetchList();
        }
      })
      .catch(err => {
        //console.log(err);
        this.setState({
          status: false,
          msg: "CANNOT UPDATE AN ENTRY WHILE OFFLINE"
        });
        $("#snackBarTrigger").trigger("click");
      });
  };

  render() {
    const { status, msg } = this.state;
    const { myJournal, edit, read, switchToOffline, fetchList } = this.props;

    return (
      <>
        {edit === true && (
          <div>
            <Updater
              status={status}
              onEntry={this.onUpdate}
              fetchList={fetchList}
            />
          </div>
        )}
        {read === true && <Read status={status} onDelete={this.onDelete} />}
        {edit === false && read === false && (
          <>
            <nav>
              <TableNav
                journalname={myJournal.journalname}
                switchToOffline={switchToOffline}
                onWrite={this.props.onWrite}
              />
            </nav>
            <div className="unfixed">
              <ReadTable
                journal={myJournal.savedEntries}
                onDelete={this.onDelete}
                fetchList={fetchList}
              />
            </div>
          </>
        )}
        <SnackBar msg={msg} />
      </>
    );
  }
}

const OnlineReader = connect(
  mapStateToOnlineReader,
  mapDispatchToOnlineReader
)(OnlineReaderConstruct);

export default OnlineReader;
