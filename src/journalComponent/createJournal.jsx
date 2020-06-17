import React, { Component } from "react";
import { connect } from "react-redux";
//import * as moment from "moment";
import { uuid } from "uuidv4";
import JournalForm from "./journalForm";
import { setMsg } from "../component/redux";
import SnackBar from "../component/snackBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../component/spinner";
import { newJournal } from "../journalStrings/firestoreRedux";

const mapStateToCreate = (state) => {
  return state;
};

const mapDispatchToCreate = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  newJournal: (data) => dispatch(newJournal(data)),
});

class CreateNewJournalConstruct extends Component {
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
    return (
      <>
        {isOpen === true ? (
          <div className="card col-sm-9 col-md-7 col-lg-6 bg-info mx-auto my-3">
            <div className="card-body">
              <>
                {allowed === true ? (
                  <JournalForm
                    journalName=""
                    journalDescription=""
                    onFormSubmit={this.onFormSubmit}
                    onFormClose={this.onFormClose}
                    btnText="Create"
                  />
                ) : (
                  <p>Only allowed for premium users!</p>
                )}
              </>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <button
              onClick={this.onFormOpen}
              className="btn btn-outline-info mx-auto my-4"
            >
              new Journal{" "}
              {this.props.status === true ? (
                <Spinner status={this.props.status} />
              ) : (
                <FontAwesomeIcon icon="plus" />
              )}
            </button>
          </div>
        )}

        <SnackBar />
      </>
    );
  }
}

const CreateNewJournal = connect(
  mapStateToCreate,
  mapDispatchToCreate
)(CreateNewJournalConstruct);

export default CreateNewJournal;
