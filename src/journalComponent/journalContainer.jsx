import React, { Component } from "react";
import { connect } from "react-redux";
import { journalList, checkKey, isLogged } from "../component/redux";
import db from "../component/dbaccess";
import JournalComponent from "./journalComponent";
import PinLogin from "../security/pinLogin";
import MainBackdrop from "../component/backdrop";

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
    const journals = this.props.firestore.ordered?.journals;
    return (
      <>
        {journals?.length ? (
          this.props.custom.storageKey ? (
            this.props.custom.securityKey ? (
              <JournalComponent />
            ) : (
              <PinLogin />
            )
          ) : (
            <JournalComponent />
          )
        ) : (
          <MainBackdrop status={this.props.custom.loading} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalContainer);
