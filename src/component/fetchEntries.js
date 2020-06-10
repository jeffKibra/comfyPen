import React, { Component } from "react";
import { connect } from "react-redux";
import { savedEntries, unsavedEntries } from "./redux";
import db from "./dbaccess";
import Fetcher from "./server";
import Spinner from "./spinner";

const mapStateToFetchEntries = (state) => {
  return state;
};

const mapDispatchToFetchEntries = (dispatch) => ({
  savedEntries: (data) => dispatch(savedEntries(data)),
  unsavedEntries: (data) => dispatch(unsavedEntries(data)),
});

class FetchEntriesConstruct extends Component {
  state = { status: false };

  onClick = () => {
    const journalId = !!this.props.activeJournal.journalId;
    if (journalId) {
      this.fetchList();
    }
  };

  fetchList = () => {
    this.setState({ status: true });
    const listData = {
      journalId: this.props.activeJournal.journalId,
      submit: "entriesList",
    };

    Fetcher(listData, "POST")
      .then((res) => {
        if (res.value === false) {
          throw new Error("false value");
        } else {
          this.setState({ status: false });
          this.refreshDb(res);
        }
      })
      .catch((err) => {
        this.updateStore();
        this.setState({ status: false });
      });
  };

  refreshDb = (res) => {
    db.savedEntries
      .where("journalId")
      .equals(this.props.journalId)
      .delete()
      .then(() => {
        return res.forEach((anEntry) => {
          console.log(anEntry);
          db.savedEntries.add(anEntry);
        });
      })
      .then(() => {
        return this.updateStore();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  updateStore = () => {
    db.savedEntries
      .where("journalId")
      .equals(this.props.activeJournal.journalId)
      .toArray()
      .then((value) => {
        this.props.savedEntries(value);
      })
      .catch((err) => {
        console.log(err.message);
      });
    db.unsavedEntries
      .where("journalId")
      .equals(this.props.activeJournal.journalId)
      .toArray()
      .then((val) => {
        this.props.unsavedEntries(val);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        <Spinner status={this.state.status} />
        <button
          onClick={this.onClick}
          id="fetchEntriesList"
          style={{ display: "none" }}
        ></button>
      </div>
    );
  }
}

const FetchEntries = connect(
  mapStateToFetchEntries,
  mapDispatchToFetchEntries
)(FetchEntriesConstruct);

export default FetchEntries;
