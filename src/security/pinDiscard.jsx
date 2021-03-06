import React from "react";
import db from "../component/dbaccess";
import { connect } from "react-redux";
import { checkKey, setMsg } from "../component/redux";
import { useHistory } from "react-router-dom";
import PinForm from "./pinForm";
import $ from "jquery";
import { encryptPin } from "../component/enctype";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function PinDiscard(props) {
  const history = useHistory();
  const discard = async (data) => {
    const hashedPin = await encryptPin(data.pin);
    db.pin
      .where("pin")
      .equals(hashedPin)
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
      <PinForm onFormSubmit={discard} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PinDiscard);
