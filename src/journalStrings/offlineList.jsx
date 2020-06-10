import React, { Component } from "react";
import OfflineEntry from "./offlineEntry";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import { connect } from "react-redux";
import { unsavedEntries } from "../component/redux";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const mapDispatchToOfflineList = (dispatch) => ({
  unsavedEntries: (data) => dispatch(unsavedEntries(data)),
});

class OfflineListConstruct extends Component {
  state = {
    status: false,
    msg: "",
  };

  unsavedData = (data) => {
    this.setState({ status: true, msg: "" });
    return Fetcher(data, "POST")
      .then((res) => {
        if (res.value === false) {
          throw new Error("false value");
        } else {
          this.setState({ status: false, msg: "saved" });
          $("#snackBarTrigger").trigger("click");
          db.unsavedEntries.delete(data.entryId).then(() => {
            db.unsavedEntries
              .where("journalId")
              .equals(this.props.activeJournal.journalId)
              .toArray()
              .then((val) => {
                this.props.unsavedEntries(val);
              });
          });
        }
      })
      .catch((err) => {
        this.setState({
          status: false,
          msg: "saving failed! please try agin later",
        });
        $("#snackBarTrigger").trigger("click");
      });
  };

  onFormSubmit = (data) => {
    const verified = [];
    const names = Object.keys(data);
    names.forEach((val) => {
      if (data[val] && val !== "all") {
        verified.push(val);
      }
    });
    //console.log(names);
    //console.log(verified);

    verified.forEach((value, index) => {
      db.unsavedEntries
        .where("entryId")
        .equals(value)
        .toArray()
        .then((val) => {
          //console.log(val);
          if (val.length !== 0) {
            this.unsavedData(val[0])
              .then(() => {
                if (index === verified.length - 1) {
                  this.props.fetchList();
                }
              })
              .catch((err) => {
                db.unsavedEntries
                  .where("journalId")
                  .equals(this.props.activeJournal.journalId)
                  .toArray()
                  .then((val) => {
                    //console.log(val);
                    this.props.unsavedEntries(val);
                  });
                //console.log(err);
              });
          }
        });
    });

    //props.onFormSubmit(data);
  };

  render() {
    const { status, msg } = this.state;
    //console.log(this.props);
    return (
      <div>
        <OfflineEntry
          switchToOnline={this.props.switchToOnline}
          onFormSubmit={this.onFormSubmit}
          status={status}
        />

        <SnackBar msg={msg} />
      </div>
    );
  }
}

const OfflineList = connect(
  null,
  mapDispatchToOfflineList
)(OfflineListConstruct);

export default OfflineList;
