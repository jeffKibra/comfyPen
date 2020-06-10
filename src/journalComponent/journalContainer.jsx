import React, { Component } from "react";
import { connect } from "react-redux";
import { journalList, checkKey, isLogged } from "../component/redux";
import db from "../component/dbaccess";
import JournalComponent from "./journalComponent";
import MainNav from "../navs/mainNav";

const mapStateToJournalContainer = (state) => {
  return state;
};

const mapDispatchToJournalContainer = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
  journalList: (newJournal) => dispatch(journalList(newJournal)),
  isLogged: (data) => dispatch(isLogged(data)),
});

class JournalContainerConstruct extends Component {
  state = {
    status: false,
  };

  componentDidMount() {
    db.pin.count().then((value) => {
      if (value === 0) {
        this.props.checkKey({ storageKey: false });
      } else {
        this.props.checkKey({ storageKey: true });
      }
    });
    db.token.toArray().then((value) => {
      if (value.length === 0 || value[0].comfy === "") {
        this.props.isLogged({ logged: false });
        this.dbRefresh();
      } else {
        this.props.isLogged({ logged: true });
        this.refreshJournal();
      }
    });
  }

  refreshJournal = () => {
    this.setState({ status: true });

    this.setState({ status: false });

    this.dbRefresh();
  };

  dbRefresh = () => {
    db.customJournalsList.toArray().then((val) => {
      this.setState({ status: false });
      this.props.journalList(val);
    });
  };

  render() {
    return (
      <>
        <nav>
          <MainNav />
        </nav>
        <div className="unfixed container">
          <JournalComponent />
          <button
            onClick={this.refreshJournal}
            id="refresh"
            style={{ display: "none" }}
          ></button>
        </div>
      </>
    );
  }
}

const JournalContainer = connect(
  mapStateToJournalContainer,
  mapDispatchToJournalContainer
)(JournalContainerConstruct);

export default JournalContainer;
