import React, { Component } from "react";
import db from "../component/dbaccess";
import { setKey, isLogged, checkKey } from "../component/redux";
import { connect } from "react-redux";
import PinForm from "./pinForm";

const mapStateToPinLogin = (state) => ({
  securityKey: state.securityKey,
  logged: state.logged,
  storageKey: state.storageKey,
});
const mapDispatchToPinLogin = (dispatch) => ({
  setKey: (data) => dispatch(setKey(data)),
  checkKey: (data) => dispatch(checkKey(data)),
  isLogged: (data) => dispatch(isLogged(data)),
});

function PinLoginConstruct(props) {
  const access = (data) => {
    db.pin
      .where("pin")
      .equals(data.pin)
      .count()
      .then((value) => {
        if (value === 0) {
          alert("invalid key");
        } else {
          props.setKey(data);
        }
      });
  };

  return <PinForm next={access} />;
}

const PinLogin = connect(
  mapStateToPinLogin,
  mapDispatchToPinLogin
)(PinLoginConstruct);

export default PinLogin;
