import React, { Component } from "react";
import { connect } from "react-redux";
import JournalString from "./journalString";
import { activeJournal, entries, unsavedEntries } from "../component/redux";
import db from "../component/dbaccess";
import MainBackdrop from "../component/backdrop";
import Fetcher from "../component/server";

const mapStateToJournal = state => {
  const journalid = state.journalId;
  return { journalid };
};

const mapDispatchToJournal = dispatch => ({
  activeJournal: data => dispatch(activeJournal(data)),
  entries: data => dispatch(entries(data)),
  unsavedEntries: data => dispatch(unsavedEntries(data))
});

class JournalStringConstruct extends Component {
  state = { status: false };

  componentDidMount() {
    this.fetchList();

    db.onlineJournalList
      .where("journalid")
      .equals(this.props.journalid)
      .toArray()
      .then(val => {
        this.props.activeJournal(val[0]);
      });
  }

  fetchList = () => {
    this.setState({ status: true });
    const listData = {
      journalid: this.props.journalid,
      submit: "READENTRIES"
    };

    Fetcher(listData, "POST")
      .then(res => {
        if (res.value === false) {
          throw new Error("false value");
        } else {
          this.setState({ status: false });
          this.refreshDb(res);
        }
      })
      .catch(err => {
        this.updateStore();
        this.setState({ status: false });
      });
  };

  refreshDb = res => {
    db.savedEntries.count().then(no => {
      if (no === 0) {
        res.forEach(anEntry => {
          db.savedEntries.add(anEntry).then(() => {
            this.updateStore();
          });
        });
      } else {
        db.savedEntries
          .where("journalid")
          .equals(this.props.journalid)
          .delete()
          .then(() => {
            res.forEach(anEntry => {
              db.savedEntries.add(anEntry);
            });
          })
          .then(() => {
            this.updateStore();
          });
      }
    });
  };

  updateStore = () => {
    db.savedEntries
      .where("journalid")
      .equals(this.props.journalid)
      .toArray()
      .then(value => {
        this.props.entries(value);
      })
      .catch(err => {});
    db.unsavedEntries
      .where("journalid")
      .equals(this.props.journalid)
      .toArray()
      .then(val => {
        this.props.unsavedEntries(val);
      })
      .catch(err => {
        // console.log("place 3");
      });
  };

  render() {
    return (
      <div>
        <MainBackdrop status={this.state.status} />
        <JournalString fetchList={this.fetchList} />
      </div>
    );
  }
}

const JournalPage = connect(
  mapStateToJournal,
  mapDispatchToJournal
)(JournalStringConstruct);

export default JournalPage;
