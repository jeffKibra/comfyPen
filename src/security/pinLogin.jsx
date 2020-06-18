import React from "react";
import db from "../component/dbaccess";
import { setKey, setMsg } from "../component/redux";
import { connect } from "react-redux";
import PinForm from "./pinForm";
import $ from "jquery";

const mapStateToPinLogin = (state) => ({
  securityKey: state.securityKey,
  logged: state.logged,
  storageKey: state.storageKey,
});
const mapDispatchToPinLogin = (dispatch) => ({
  setKey: (data) => dispatch(setKey(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function PinLoginConstruct(props) {
  const access = (data) => {
    db.pin
      .where("pin")
      .equals(data.pin)
      .count()
      .then((value) => {
        if (value === 0) throw new Error("Invalin pin");
        console.log({ value, data });
        return props.setKey(data);
      })
      .then()
      .catch((err) => {
        props.setMsg({ msg: err.message });
        $("#snackBarTrigger").trigger("click");
        console.log(err.message);
      });
  };

  return <PinForm next={access} />;
}

const PinLogin = connect(
  mapStateToPinLogin,
  mapDispatchToPinLogin
)(PinLoginConstruct);

export default PinLogin;
