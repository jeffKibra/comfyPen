import React, { Component } from "react";
import { connect } from "react-redux";
//import * as moment from "moment";
import { uuid } from "uuidv4";
import JournalForm from "./journalForm";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import { journalList, setMsg } from "../component/redux";
import SnackBar from "../component/snackBar";
import fetchJournalList from "../component/fetchJournalList";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../component/spinner";

const mapStateToCreate = (state) => {
  return state;
};

const mapDispatchToCreate = (dispatch) => ({
  journalList: (newJournal) => dispatch(journalList(newJournal)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class CreateNewJournalConstruct extends Component {
  state = {
    status: false,
    alowed: false,
    isOpen: false,
    journalname: "",
    journaldescription: "",
  };

  onFormOpen = () => {
    this.setState({ status: true });
    console.log(this.state);
    Fetcher({ submit: "journalsNumber" }, "POST")
      .then((val) => {
        this.setState({ status: false, isOpen: true });
        if (val.value >= 0 && val.value <= 5) {
          this.setState({ allowed: true });
        } else {
          this.onFormClose();
          this.setState({
            allowed: false,
          });
          this.props.setMsg({ msg: "max number of journals reached" });

          $("#snackBarTrigger").trigger("click");
        }
      })
      .catch((err) => {
        this.setState({
          status: false,
          allowed: false,
        });
        this.props.setMsg({ msg: "you are offline" });
        $("#snackBarTrigger").trigger("click");
        this.onFormClose();
      });
  };

  onFormClose = () => {
    this.setState({ isOpen: false });
  };

  onFormSubmit = (formData) => {
    this.setState({ status: true });
    //const date = moment().format("LL");
    //const time = moment().format("LTS");
    const journalData = {
      journalName: formData.journalName,
      journalDescription: formData.journalDescription,
      journalId: uuid(),
      createdAt: new Date().toISOString(),
      submit: "newJournal",
    };
    Fetcher(journalData, "POST")
      .then((val) => {
        if (!val.value) throw new Error("false value");
        this.props.setMsg({ msg: "successfully created" });
        $("#snackBarTrigger").trigger("click");
        //console.log(val);
        const res1 = fetchJournalList();
        console.log(res1);
        this.props.journalList(res1);
        this.setState({ status: false });
      })
      .catch((err) => {
        this.setState({ status: false });
        db.customJournalsList.toArray().then((val) => {
          this.props.journalList(val);
        });
        this.props.setMsg({ msg: "failed to create" });
        $("#snackBarTrigger").trigger("click");
        //console.log(err);
      });
    this.onFormClose();
  };

  render() {
    const { journalname, journaldescription, isOpen, allowed } = this.state;
    return (
      <>
        {isOpen === true ? (
          <div className="card col-sm-9 col-md-7 col-lg-6 bg-info mx-auto my-3">
            <div className="card-body">
              {this.props.logged === true ? (
                <>
                  {allowed === true ? (
                    <JournalForm
                      journalname={journalname}
                      journaldescription={journaldescription}
                      onFormSubmit={this.onFormSubmit}
                      onFormClose={this.onFormClose}
                      btnText="Create"
                    />
                  ) : (
                    <p>
                      Currently limited to a maximum of three custom journals!
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p>Must be logged in to have Access!</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <button
              onClick={this.onFormOpen}
              className="btn btn-outline-info mx-auto my-4"
            >
              new Journal{" "}
              {this.state.status === true ? (
                <Spinner status={this.state.status} />
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
