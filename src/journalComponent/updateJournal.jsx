import React, { Component } from "react";
import JournalForm from "./journalForm";
import { connect } from "react-redux";
import { setMsg } from "../component/redux";
import { updateJournal } from "../journalStrings/firestoreRedux";

const mapStateToUpdateJournal = (state) => {
  return state;
};

const mapDispatchToUpdateJournal = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  updateJournal: (data) => dispatch(updateJournal(data)),
});

class UpdateJournalConstruct extends Component {
  onJournalUpdate = (formData) => {
    console.log(formData);

    const updateData = {
      ...this.props.journal,
      journalName: formData.journalName,
      journalDescription: formData.journalDescription,
    };

    this.props.updateJournal(updateData);
    this.props.onFormClose();
    //console.log(updateData);
  };

  render() {
    console.log(this.props);
    const { journalName, journalDescription } = this.props.journal;
    return (
      <JournalForm
        msg={this.props.msg}
        journalName={journalName}
        journalDescription={journalDescription}
        onFormSubmit={this.onJournalUpdate}
        onFormClose={this.props.onFormClose}
        btnText="Update"
      />
    );
  }
}

const UpdateJournal = connect(
  mapStateToUpdateJournal,
  mapDispatchToUpdateJournal
)(UpdateJournalConstruct);

export default UpdateJournal;
