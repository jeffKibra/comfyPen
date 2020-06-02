import React, { Component } from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import sanitizeHtml from "sanitize-html";
import { uuid } from "uuidv4";
import Writer from "./writer";
import { entries, activeJournal, unsavedEntries } from "../component/redux";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import Sync from "../component/sync";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const mapStateToWriter = state => {
  const myJournal = { ...state.onlineJournal };
  return { myJournal };
};
const mapDispatchToWriter = dispatch => ({
  activeJournal: data => dispatch(activeJournal(data)),
  entries: data => dispatch(entries(data)),
  unsavedEntries: data => dispatch(unsavedEntries(data))
});

class WriterConstruct extends Component {
  state = {
    status: false,
    msg: ""
  };

  onNewEntry = data => {
    this.setState({ status: true });
    let date = moment().format("LL");
    let time = moment().format("LTS");
    let entryid = uuid();
    const entryData = {
      ...data,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalid: this.props.myJournal.journalid,
      entryid,
      date,
      time,
      submit: "ENTRY"
    };

    Fetcher(entryData, "POST")
      .then(res => {
        //console.log(res);

        if (res.value === false) {
          throw new Error("false values");
        } else {
          this.setState({ status: false, msg: "data saved" });
          $("#snackBarTrigger").trigger("click");
          this.props.fetchList();
        }
      })
      .catch(err => {
        this.setState({ msg: "data saved offline", status: false });
        $("#snackBarTrigger").trigger("click");
        db.unsavedEntries.add(entryData).then(() => {
          this.props.fetchList();
        });
        Sync(entryData);
        //console.log(err);
      });
  };

  render() {
    const { status, msg } = this.state;
    const { onView } = this.props;
    return (
      <>
        <Writer
          subject=""
          entry=""
          newEntry={this.onNewEntry}
          status={status}
          onView={onView}
        />
        <SnackBar msg={msg} />
      </>
    );
  }
}

const NewEntry = connect(
  mapStateToWriter,
  mapDispatchToWriter
)(WriterConstruct);

export default NewEntry;
