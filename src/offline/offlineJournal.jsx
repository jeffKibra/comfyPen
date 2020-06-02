import React, { Component } from "react";
import { connect } from "react-redux";
import db from "../component/dbaccess";
import { offlineEntry, onWrite } from "../component/redux";
import Updater from "../journalStrings/updater";
import ReadTable from "../journalStrings/readTable";
import Read from "../journalStrings/read";
import OfflineNav from "../navs/offlineNav";
import OfflineEntry from "./offlineEntry";

const mapStateToOfflineJournal = state => {
  const { edit, read, write } = state;
  const myJournal = state.offlineJournal;
  return { myJournal, edit, read, write };
};

const mapDispatchToOfflineJournal = dispatch => ({
  offlineEntry: data => dispatch(offlineEntry(data)),
  onWrite: () => dispatch(onWrite())
});

class OfflineJournalConstruct extends Component {
  state = {
    deleteStatus: false,
    deleteMsg: "",
    status: false,
    msg: ""
  };

  componentDidMount() {
    db.offlineJournal.toArray().then(val => {
      this.props.offlineEntry(val);
    });
  }

  onDelete = data => {
    console.log(data);
    db.offlineJournal.delete(data.entryid).then(() => {
      db.offlineJournal.toArray().then(val => {
        this.props.offlineEntry(val);
      });
    });
  };

  onUpdate = appData => {
    this.setState({ status: true });
    db.offlineJournal.put(appData).then(() => {
      db.offlineJournal.toArray().then(val => {
        this.props.offlineEntry(val);
        this.setState({ status: false, msg: "updated" });
      });
    });
  };

  render() {
    const { myJournal, fetchList, edit, read, write } = this.props;

    const { status, msg, deleteStatus, deleteMsg } = this.state;

    if (edit) {
      return (
        <div>
          <Updater
            status={status}
            msg={msg}
            onEntry={this.onUpdate}
            fetchList={fetchList}
          />
        </div>
      );
    } else if (write) {
      return (
        <div>
          <OfflineEntry />
        </div>
      );
    } else if (read) {
      return (
        <Read status={deleteStatus} msg={deleteMsg} onDelete={this.onDelete} />
      );
    } else {
      return (
        <React.Fragment>
          <nav>
            <OfflineNav onWrite={this.props.onWrite} />
          </nav>
          <div className="unfixed">
            <ReadTable
              fetchList={fetchList}
              journal={myJournal}
              onDelete={this.onDelete}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

const OfflineJournal = connect(
  mapStateToOfflineJournal,
  mapDispatchToOfflineJournal
)(OfflineJournalConstruct);

export default OfflineJournal;
