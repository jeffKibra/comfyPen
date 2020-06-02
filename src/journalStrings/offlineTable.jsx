import React, { Component } from "react";
import OfflineJournal from "./offlineEntry";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import { connect } from "react-redux";
import { onRead, onWrite, unsavedEntries } from "../component/redux";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const mapDispatchToOfflineTable = dispatch => ({
  onWrite: () => dispatch(onWrite()),
  onRead: data => dispatch(onRead(data)),
  unsavedEntries: data => dispatch(unsavedEntries(data))
});

class OfflineTableConstruct extends Component {
  state = {
    status: false,
    msg: ""
  };

  unsavedData = data => {
    this.setState({ status: true, msg: "" });
    return Fetcher(data, "POST")
      .then(res => {
        if (res.value === false) {
          throw new Error("false value");
        } else {
          this.setState({ status: false, msg: "saved" });
          $("#snackBarTrigger").trigger("click");
          db.unsavedEntries.delete(data.entryid).then(() => {
            db.unsavedEntries
              .where("journalid")
              .equals(this.props.journalid)
              .toArray()
              .then(val => {
                this.props.unsavedEntries(val);
              });
          });
        }
      })
      .catch(err => {
        this.setState({
          status: false,

          msg: "saving failed! please try agin later"
        });
        $("#snackBarTrigger").trigger("click");
      });
  };

  onFormSubmit = data => {
    const verified = [];
    const names = Object.keys(data);
    names.forEach(val => {
      if (data[val] && val !== "all") {
        verified.push(val);
      }
    });
    //console.log(names);
    //console.log(verified);

    verified.forEach((value, index) => {
      db.unsavedEntries
        .where("entryid")
        .equals(value)
        .toArray()
        .then(val => {
          //console.log(val);
          if (val.length !== 0) {
            this.unsavedData(val[0])
              .then(() => {
                if (index === verified.length - 1) {
                  this.props.fetchList();
                }
              })
              .catch(err => {
                db.unsavedEntries
                  .where("journalid")
                  .equals(this.props.journalid)
                  .toArray()
                  .then(val => {
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
    const { onRead, onWrite, journal } = this.props;
    const { status, msg } = this.state;
    //console.log(this.props);
    return (
      <div>
        <OfflineJournal
          switchToOnline={this.props.switchToOnline}
          onWrite={onWrite}
          journal={journal}
          onFormSubmit={this.onFormSubmit}
          onRead={onRead}
          status={status}
        />

        <button
          onClick={onWrite}
          className="btn btn-sm  btn-outline-primary write-btn"
        >
          <i className="fas fa-pen-alt"></i>
        </button>
        <SnackBar msg={msg} />
      </div>
    );
  }
}

const OfflineTable = connect(
  null,
  mapDispatchToOfflineTable
)(OfflineTableConstruct);

export default OfflineTable;
