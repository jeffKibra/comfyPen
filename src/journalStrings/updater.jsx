import React, { Component } from "react";
import Writer from "./writer";
import { connect } from "react-redux";
import { updateEntry } from "./firestoreRedux";
import $ from "jquery";
import { setMsg } from "../component/redux";
import Decrypter from "./decrypter";

const mapDispatchToProps = (dispatch) => ({
  updateEntry: (data) => dispatch(updateEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class UpdaterOnline extends Component {
  onEntry = (data) => {
    const { entry, customEntry } = data.entry;

    const appData = {
      ...this.props.entry,
      subject: data.subject,
      entry,
      customEntry,
    };
    this.onUpdate(appData);
  };

  onUpdate = (data) => {
    this.props.updateEntry(data);
    this.props.setMsg({ msg: "entry updated" });
    $("#snackBarTrigger").trigger("click");
    this.props.history.push("/onlineList/" + data.journalId);
  };

  render() {
    const { subject, entry, journalId } = this.props.entry;
    const journal = { journalId };

    return (
      <>
        <Writer
          subject={subject}
          journal={journal}
          entry={entry}
          newEntry={this.onEntry}
        />
      </>
    );
  }
}

export default Decrypter(connect(null, mapDispatchToProps)(UpdaterOnline));
