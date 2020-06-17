import React, { Component } from "react";
import Fetcher from "./server";
import db from "./dbaccess";
import Spinner from "./spinner";
import { connect } from "react-redux";
import { journalList } from "../component/redux";

const mapDispatchToFetchJournalList = (dispatch) => ({
  journalList: (journals) => dispatch(journalList(journals)),
});

class FetchJournalListConstruct extends Component {
  state = {
    status: false,
  };

  fetchList = () => {
    this.setState({ status: true });
    Fetcher({ submit: "journalList" }, "POST")
      .then((res) => {
        this.setState({ status: false });
        if (res.value === false) {
          throw new Error("false value");
        } else {
          this.props.journalList(res);
          db.customJournalsList
            .clear()
            .then(() => {
              res.forEach((val) => {
                db.customJournalsList.add(val);
              });
            })
            .then(() => {
              this.dbRefresh();
            });
        }
      })
      .catch((error) => {
        this.setState({ status: false });
        this.dbRefresh();
      });
  };

  dbRefresh = () => {
    db.customJournalsList.toArray().then((val) => {
      this.setState({ status: false });
      this.props.journalList(val);
    });
  };

  render() {
    return (
      <div>
        <Spinner status={this.state.status} />
        <button
          onClick={this.fetchList}
          id="fetchJournalList"
          style={{ display: "none" }}
        ></button>
      </div>
    );
  }
}

const FetchJournalList = connect(
  null,
  mapDispatchToFetchJournalList
)(FetchJournalListConstruct);

export default FetchJournalList;
