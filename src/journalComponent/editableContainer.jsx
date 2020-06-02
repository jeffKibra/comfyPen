import React, { Component } from "react";
import Fetcher from "../component/server";
import EditableComponent from "./editableComponent";
import SnackBar from "../component/snackBar";
import $ from "jquery";

class EditableContainer extends Component {
  state = {
    editFormOpen: false,
    open: false,
    msg: ""
  };

  onJournalDelete = id => {
    Fetcher({ journalid: id, submit: "DELETEJOURNAL" }, "DELETE")
      .then(val => {
        this.setState({ msg: "deleted" });
        $("#snackBarTrigger").trigger("click");
        //console.log(val);
        this.props.refreshJournal();
      })
      .catch(err => {
        this.setState({ msg: "deletion failed" });
        $("#snackBarTrigger").trigger("click");
        this.props.refreshJournal();
        //console.log(err);
      });
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    return (
      <>
        <EditableComponent
          refreshJournal={this.props.refreshJournal}
          onJournalDelete={this.onJournalDelete}
          closeForm={this.closeForm}
          openForm={this.openForm}
          editFormOpen={this.state.editFormOpen}
          journal={this.props.journal}
        />
        <SnackBar msg={this.state.msg} />
      </>
    );
  }
}

export default EditableContainer;
