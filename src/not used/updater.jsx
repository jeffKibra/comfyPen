import React, { Component } from "react";
import Writer from "../journalStrings/writer";
import { connect } from "react-redux";
import { updateEntry } from "../journalStrings/firestoreRedux";
import $ from "jquery";
import { setMsg } from "../component/redux";
import Decrypter from "../journalStrings/decrypter";
import { compose } from "recompose";
import PropTypes from "prop-types";

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

UpdaterOnline.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
};

export default compose(
  Decrypter,
  connect(null, mapDispatchToProps)
)(UpdaterOnline);
