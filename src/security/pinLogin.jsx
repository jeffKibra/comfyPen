import React from "react";
import db from "../component/dbaccess";
import { setKey, setMsg } from "../component/redux";
import { connect } from "react-redux";
import PinForm from "./pinForm";
import $ from "jquery";
import { encryptPin } from "../component/enctype";

const mapStateToPinLogin = (state) => ({
  securityKey: state.custom.securityKey,
  storageKey: state.custom.storageKey,
});

const mapDispatchToPinLogin = (dispatch) => ({
  setKey: (data) => dispatch(setKey(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function PinLoginConstruct(props) {
  const access = async (data) => {
    const hashedPin = await encryptPin(data.pin);
    db.pin
      .where("pin")
      .equals(hashedPin)
      .count()
      .then((value) => {
        if (value === 0) throw new Error("Invalin pin");
        //console.log({ value, data });
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
