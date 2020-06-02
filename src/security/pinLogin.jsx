import React, { Component } from "react";
import db from "../component/dbaccess";
import { setKey, isLogged, checkKey } from "../component/redux";
import { connect } from "react-redux";
import PinForm from "./pinForm";

const mapStateToPinLogin = state => ({
  securityKey: state.securityKey,
  logged: state.logged,
  storageKey: state.storageKey
});
const mapDispatchToPinLogin = dispatch => ({
  setKey: data => dispatch(setKey(data)),
  checkKey: data => dispatch(checkKey(data)),
  isLogged: data => dispatch(isLogged(data))
});

class PinLoginConstruct extends Component {
  componentDidMount() {
    db.secret.count().then(val => {
      if (val !== 0) {
        this.props.checkKey({ storageKey: true });
      }
    });
  }

  access = data => {
    db.secret
      .where("key")
      .equals(data.pin)
      .count()
      .then(value => {
        if (value === 0) {
          alert("invalid key");
        } else {
          this.props.setKey(data);
        }
      });
  };

  render() {
    return <PinForm next={this.access} />;
  }
}

const PinLogin = connect(
  mapStateToPinLogin,
  mapDispatchToPinLogin
)(PinLoginConstruct);

export default PinLogin;
