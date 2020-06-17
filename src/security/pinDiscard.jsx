import React from "react";
import db from "../component/dbaccess";
import { connect } from "react-redux";
import { checkKey, setMsg } from "../component/redux";
import { useHistory } from "react-router-dom";
import PinForm from "./pinForm";
import $ from "jquery";

const mapStateToPinDiscard = (state) => {
  return state;
};

const mapDispatchToPinDiscard = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function PinDiscardConstruct(props) {
  const history = useHistory();
  const discard = (data) => {
    db.pin
      .where("pin")
      .equals(data.pin)
      .count()
      .then((val) => {
        if (val === 0) throw new Error("invalid pin");
        return db.pin.clear();
      })
      .then(() => {
        props.checkKey({ storageKey: false });
        history.push("/security");
      })
      .catch((err) => {
        props.setMsg({ msg: "Invalid pin!" });
        $("#snackBarTrigger").trigger("click");
        console.log(err.message);
      });
  };

  return (
    <>
      <PinForm next={discard} />
    </>
  );
}

const PinDiscard = connect(
  mapStateToPinDiscard,
  mapDispatchToPinDiscard
)(PinDiscardConstruct);

export default PinDiscard;
