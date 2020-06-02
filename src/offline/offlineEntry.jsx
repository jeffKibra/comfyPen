import React, { Component } from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import sanitizeHtml from "sanitize-html";
import { uuid } from "uuidv4";
import db from "../component/dbaccess";
import { offlineEntry } from "../component/redux";
import Writer from "../journalStrings/writer";
import $ from "jquery";
import SnackBar from "../component/snackBar";

const mapDispatchToOfflineEntry = dispatch => ({
  journalDisplay: data => dispatch(offlineEntry(data))
});

class OfflineEntryConstruct extends Component {
  state = {
    status: false,
    msg: ""
  };

  onNewEntry = data => {
    this.setState({ status: true, msg: "" });
    let date = moment().format("LL");
    let time = moment().format("LTS");
    const appData = {
      ...data,
      entryid: uuid(),
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      date,
      time
    };
    db.offlineJournal
      .add(appData)
      .then(() => {
        this.setState({ status: false, msg: "saved" });
        $("#snackBarTrigger").trigger("click");
        db.offlineJournal.toArray().then(records => {
          this.props.journalDisplay(records);
        });
      })
      .catch(err => {
        this.setState({ status: false, msg: "Saving failed!" });
        $("#snackBarTrigger").trigger("click");
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

const OfflineEntry = connect(
  null,
  mapDispatchToOfflineEntry
)(OfflineEntryConstruct);

export default OfflineEntry;
