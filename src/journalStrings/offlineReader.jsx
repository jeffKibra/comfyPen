import React, { Component } from "react";
import OfflineTable from "./offlineTable";
import db from "../component/dbaccess";
import { connect } from "react-redux";
import { unsavedEntries } from "../component/redux";
import Read from "./read";
import Updater from "./updater";
import sanitizeHtml from "sanitize-html";
import { onEdit, onRead, onWrite } from "../component/redux";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const mapStateToOfflineReader = state => {
  const { read, edit, journalId } = state;

  const myJournal = { ...state.onlineJournal };
  return { myJournal, read, edit, journalId };
};

const mapDispatchToOfflineReader = dispatch => ({
  unsavedEntries: data => dispatch(unsavedEntries(data)),
  onRead: data => dispatch(onRead(data)),
  onEdit: data => dispatch(onEdit(data)),
  onWrite: () => dispatch(onWrite())
});

class OfflineReaderConstruct extends Component {
  state = {
    status: false,

    msg: ""
  };

  componentDidMount() {
    db.unsavedEntries
      .where("journalid")
      .equals(this.props.journalId)
      .toArray()
      .then(val => {
        this.props.unsavedEntries(val);
      });
  }

  onDelete = data => {
    this.setState({ status: true });
    db.unsavedEntries.delete(data.entryid).then(() => {
      this.setState({ status: false, msg: "Deleted" });
      $("#snackBarTrigger").trigger("click");
      db.unsavedEntries
        .where("journalid")
        .equals(this.props.myJournal.journalid)
        .toArray()
        .then(val => {
          this.props.unsavedEntries(val);
        });
    });
  };

  onUpdate = data => {
    this.setState({ status: true });
    const appData = {
      ...this.state.editorData,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalid: this.props.myJournal.journalid,
      submit: "ENTRY"
    };

    db.unsavedEntries.put(appData).then(() => {
      db.unsavedEntries
        .where("journalid")
        .equals(this.props.myJournal.journalid)
        .toArray()
        .then(val => {
          this.props.unsavedEntries(val);
          this.setState({ status: false, msg: "updated" });
          $("#snackBarTrigger").trigger("click");
        });
    });
  };

  render() {
    const {
      myJournal,
      fetchList,
      unsavedEntries,
      switchToOnline,
      edit,
      read
    } = this.props;
    const { status, msg } = this.state;

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
        {read === false && edit === false && (
          <>
            <OfflineTable
              switchToOnline={switchToOnline}
              unsavedEntries={unsavedEntries}
              fetchList={fetchList}
              journalid={myJournal.journalid}
              journal={myJournal.unsavedEntries}
              onDelete={this.onDelete}
              //reveal onWriter
            />
          </>
        )}
        <SnackBar msg={msg} />
      </>
    );
  }
}

const OfflineReader = connect(
  mapStateToOfflineReader,
  mapDispatchToOfflineReader
)(OfflineReaderConstruct);

export default OfflineReader;
