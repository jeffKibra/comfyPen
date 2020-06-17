import React, { Component } from "react";
import { connect } from "react-redux";
import { setEntriesList } from "./redux";
import db from "./dbaccess";
import Fetcher from "./server";
import Spinner from "./spinner";

const mapStateToFetchEntries = (state) => {
  return state;
};

const mapDispatchToFetchEntries = (dispatch) => ({
  setEntriesList: (data) => dispatch(setEntriesList(data)),
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
    db.entriesList
      .where("journalId")
      .equals(this.props.activeJournal.journalId)
      .delete()
      .then(() => {
        return res.forEach((anEntry) => {
          console.log(anEntry);
          db.entriesList.add(anEntry);
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
    db.entriesList
      .where("journalId")
      .equals(this.props.activeJournal.journalId)
      .toArray()
      .then((val) => {
        this.props.setEntriesList(val);
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
