import React, { Component } from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import { uuid } from "uuidv4";
import JournalForm from "./journalForm";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import { journalList } from "../component/redux";
import MainBackdrop from "../component/backdrop";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const mapDispatchToCreate = dispatch => ({
  displayJournal: newJournal => dispatch(journalList(newJournal))
});

class CreateNewJournalConstruct extends Component {
  state = {
    status: false,
    alowed: false,
    isOpen: false,
    logged: false,
    msg: "",
    journalname: "",
    journaldescription: ""
  };

  onFormOpen = () => {
    this.setState({ isOpen: true });
    db.users.count().then(val => {
      if (val === 0) {
        this.setState({ logged: false });
      } else {
        this.setState({ status: true, logged: true });
        Fetcher({ submit: "READER" }, "POST").then(val => {
          this.setState({ status: false });
          if (val.length >= 0 && val.length <= 3) {
            this.setState({ allowed: true });
          } else {
            this.onFormClose();
            this.setState({
              allowed: false,
              msg: "max number of journals reached"
            });

            $("#snackBarTrigger").trigger("click");
          }
        });
      }
    });
  };
  onFormClose = () => {
    this.setState({ isOpen: false });
  };

  onFormSubmit = formData => {
    this.setState({ status: true });
    const date = moment().format("LL");
    const time = moment().format("LTS");
    const journalData = {
      journalname: formData.journalName,
      journaldescription: formData.journalDescription,
      journalid: uuid(),
      date: date,
      time: time,
      submit: "JOURNAL"
    };
    Fetcher(journalData, "POST")
      .then(val => {
        this.setState({ msg: "successfully created" });
        $("#snackBarTrigger").trigger("click");
        //console.log(val);
        Fetcher({ submit: "READER" }, "POST").then(res => {
          this.setState({ status: false });
          db.onlineJournalList
            .clear()
            .then(() => {
              res.forEach(val => {
                db.onlineJournalList.add(val);
              });
            })
            .then(() => {
              db.onlineJournalList.toArray().then(val => {
                this.props.displayJournal(val);
              });
            });
        });
      })
      .catch(err => {
        db.onlineJournalList.toArray().then(val => {
          this.props.displayJournal(val);
        });
        this.setState({ msg: "failed to create" });
        $("#snackBarTrigger").trigger("click");
        //console.log(err);
      });
    this.onFormClose();
  };

  render() {
    const {
      journalname,
      journaldescription,
      msg,
      isOpen,
      logged,
      status,
      allowed
    } = this.state;
    return (
      <>
        {isOpen === true && (
          <div className="card col-sm-9 col-md-7 col-lg-6 bg-info mx-auto my-3">
            <div className="card-body">
              {logged === false && (
                <>
                  <p>Only allowed for logged in users!</p>
                </>
              )}
              {logged === true && (
                <>
                  {allowed === true && (
                    <JournalForm
                      journalname={journalname}
                      journaldescription={journaldescription}
                      onFormSubmit={this.onFormSubmit}
                      onFormClose={this.onFormClose}
                      btnText="Create"
                    />
                  )}
                  {allowed === false && (
                    <p>Only a maximum of Three custom journals are allowed</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {isOpen === false && (
          <div className="mx-auto">
            <button
              onClick={this.onFormOpen}
              className="btn btn-outline-info mx-auto my-4"
            >
              new Journal <i className="fas fa-plus"></i>
            </button>
          </div>
        )}
        <MainBackdrop status={status} />
        <SnackBar msg={msg} />
      </>
    );
  }
}

const CreateNewJournal = connect(
  null,
  mapDispatchToCreate
)(CreateNewJournalConstruct);

export default CreateNewJournal;
