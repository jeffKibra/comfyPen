import React, { Component } from "react";
import { connect } from "react-redux";
import { journalList, checkKey, isLogged } from "../component/redux";
import db from "../component/dbaccess";
import JournalComponent from "./journalComponent";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
  journalList: (newJournal) => dispatch(journalList(newJournal)),
  isLogged: (data) => dispatch(isLogged(data)),
});

class JournalContainer extends Component {
  componentDidMount() {
    db.pin.count().then((value) => {
      if (value === 0) {
        this.props.checkKey({ storageKey: false });
      } else {
        this.props.checkKey({ storageKey: true });
      }
    });
    //check for logedin user
  }

  render() {
    return (
      <>
        <JournalComponent />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer);
