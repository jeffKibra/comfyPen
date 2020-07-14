import React, { Component } from "react";
import { connect } from "react-redux";
//import * as moment from "moment";
import { uuid } from "uuidv4";
import { setMsg } from "../component/redux";
import { newJournal } from "../journalStrings/firestoreRedux";
import CreateJournalComponent from "./createJournalComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  newJournal: (data) => dispatch(newJournal(data)),
});

class CreateJournal extends Component {
  state = {
    alowed: false,
    isOpen: false,
  };

  onFormOpen = () => {
    this.setState({ status: false, isOpen: true });
  };

  onFormClose = () => {
    this.setState({ isOpen: false });
  };

  onFormSubmit = (formData) => {
    //const date = moment().format("LL");
    //const time = moment().format("LTS");
    const journalData = {
      journalName: formData.journalName,
      journalDescription: formData.journalDescription,
      journalId: uuid(),
      createdAt: new Date().toISOString(),
    };

    this.props.newJournal(journalData);
    this.onFormClose();
  };

  render() {
    const { isOpen, allowed } = this.state;
    const { status } = this.props;
    return (
      <>
        <CreateJournalComponent
          isOpen={isOpen}
          allowed={allowed}
          onFormOpen={this.onFormOpen}
          onFormClose={this.onFormClose}
          onFormSubmit={this.onFormSubmit}
          status={status}
        />
      </>
    );
  }
}

CreateJournal.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJournal);
