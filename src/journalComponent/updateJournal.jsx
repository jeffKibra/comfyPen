import React, { Component } from "react";
import Fetcher from "../component/server";
import JournalForm from "./journalForm";

class UpdateJournal extends Component {
  state = {
    status: false,
    msg: "",
    journal: this.props.journal
  };

  onJournalUpdate = formData => {
    console.log(formData);

    const updateData = {
      ...this.state.journal,
      journalname: formData.journalName,
      journaldescription: formData.journalDescription
    };
    this.setState({ status: true });
    Fetcher({ ...updateData, submit: "UPDATEJOURNAL" }, "PUT")
      .then(res => {
        this.setState({ status: false, msg: "updated" });
        this.props.refreshJournal();
        //console.log(res);
        this.props.onFormClose();
      })
      .catch(err => {
        this.setState({ status: false, msg: "update failed" });
        this.props.refreshJournal();
        this.props.onFormClose();
      });
    //console.log(updateData);
  };

  render() {
    const { journalname, journaldescription } = this.state.journal;
    return (
      <JournalForm
        status={this.state.status}
        msg={this.state.msg}
        journalname={journalname}
        journaldescription={journaldescription}
        onFormSubmit={this.onJournalUpdate}
        onFormClose={this.onFormClose}
        btnText="Update"
      />
    );
  }
}

export default UpdateJournal;
