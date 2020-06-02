import React, { Component } from "react";
import { connect } from "react-redux";
import { journalList, checkKey } from "../component/redux";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import JournalComponent from "./journalComponent";

const mapStateToJournalContainer = state => {
  const storageKey = state.storageKey;
  return { storageKey };
};

const mapDispatchToJournalContainer = dispatch => ({
  checkKey: data => dispatch(checkKey(data)),
  displayJournal: newJournal => dispatch(journalList(newJournal))
});

class JournalContainerConstruct extends Component {
  state = {
    diaryid: "",
    journalUpdate: [],
    journalDelete: [],
    status: false
  };

  componentDidMount() {
    db.secret.count().then(value => {
      if (value === 0) {
        if (this.props.storageKey) {
          this.props.checkKey({ storageKey: false });
        }
      } else {
        if (!this.props.storageKey) {
          this.props.checkKey({ storageKey: true });
        }
      }
    });
    db.users.toArray().then(value => {
      if (value.length === 0 || value[0].accessToken === "") {
        this.dbRefresh();
      } else {
        this.setState({
          diaryid: value[0].id
        });
        this.refreshJournal();
      }
    });
  }

  refreshJournal = () => {
    this.setState({ status: true });
    Fetcher({ submit: "READER" }, "POST")
      .then(res => {
        if (res.value === false) {
          throw new Error("false value");
        }
        this.setState({ status: false });
        //console.log(res);
        db.onlineJournalList
          .clear()
          .then(() => {
            if (res.value !== 0) {
              res.forEach(val => {
                db.onlineJournalList.add(val);
              });
            }
          })
          .then(() => {
            this.dbRefresh();
          });
      })
      .catch(err => {
        this.setState({ status: false });
        this.dbRefresh();
        //console.log(err);
      });
  };

  dbRefresh = () => {
    db.onlineJournalList.toArray().then(val => {
      this.props.displayJournal(val);
      this.setState({ status: false });
    });
  };

  render() {
    return (
      <>
        <JournalComponent
          diaryid={this.state.diaryid}
          status={this.state.status}
          refreshJournal={this.refreshJournal}
        />
        <button
          onClick={this.refreshJournal}
          id="refresh"
          style={{ display: "none" }}
        ></button>
      </>
    );
  }
}

const JournalContainer = connect(
  mapStateToJournalContainer,
  mapDispatchToJournalContainer
)(JournalContainerConstruct);

export default JournalContainer;
