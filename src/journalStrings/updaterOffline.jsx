import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Writer from "./writer";
import { connect } from "react-redux";
import $ from "jquery";
import PagesNav from "../navs/pagesNav";
import db from "../component/dbaccess";
import { unsavedEntries, setMsg, setActiveEntry } from "../component/redux";
import { Link } from "react-router-dom";

const mapStateToUpdater = (state) => {
  return state;
};

const mapDispatchToUpdaterOffline = (dispatch) => ({
  unsavedEntries: (data) => dispatch(unsavedEntries(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

class UpdaterConstruct extends Component {
  state = {
    status: false,
  };

  onEntry = (data) => {
    const appData = {
      ...this.props.activeEntry,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalId: this.props.activeJournal.journalId,
      submit: "newEntry",
    };
    this.onUpdate(appData);
  };

  onUpdate = (data) => {
    this.setState({ status: true });
    const entryId = this.props.activeEntry.entryId;

    db.unsavedEntries.put(data).then(() => {
      this.setState({ status: false });
      db.activeEntry.clear().then(() => {
        db.unsavedEntries
          .where("entryId")
          .equals(entryId)
          .toArray()
          .then((val) => {
            db.activeEntry.add(val[0]);
            this.props.setActiveEntry(val[0]);
          });
      });
      this.props.setMsg({ msg: "updated" });
      $("#snackBarTrigger").trigger("click");

      db.unsavedEntries
        .where("journalId")
        .equals(this.props.activeJournal.journalId)
        .toArray()
        .then((val) => {
          this.props.unsavedEntries(val);
        });
    });
  };

  render() {
    const { status } = this.state;
    const { subject, entry } = this.props.activeEntry;

    return (
      <>
        <nav>
          <PagesNav>
            <Link to="/offlineList">cancel</Link>
          </PagesNav>
        </nav>
        <Writer
          subject={subject}
          entry={entry}
          newEntry={this.onEntry}
          status={status}
        />
      </>
    );
  }
}

const Updater = connect(
  mapStateToUpdater,
  mapDispatchToUpdaterOffline
)(UpdaterConstruct);

export default Updater;
