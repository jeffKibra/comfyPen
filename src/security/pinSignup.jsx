import React from "react";
import db from "../component/dbaccess";
import SnackBar from "../component/snackBar";
import KeyForm from "./keyForm";
import { connect } from "react-redux";
import { checkKey } from "../component/redux";
import { useHistory } from "react-router-dom";

const mapStateToPinSignup = (state) => {
  return state;
};

const mapDispatchToPinSignup = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

function PinSignupConstruct(props) {
  const history = useHistory();
  const pinSignup = (data) => {
    console.log(data);
    const keyData = {
      pin: data.pin,
    };
    db.pin
      .clear()
      .then(() => {
        return db.pin.add(keyData);
      })
      .then((val) => {
        console.log({ val, done: "done" });
        props.checkKey({ storageKey: true });
        history.push("/security");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="card  col-sm-6 col-md-4 col-lg-3 mx-auto bg-light my-3">
        <div className="card-body mx-auto">
          <KeyForm onSubmit={pinSignup} />
        </div>
      </div>
      <SnackBar msg="pin set" />
    </>
  );
}

const PinSignup = connect(
  mapStateToPinSignup,
  mapDispatchToPinSignup
)(PinSignupConstruct);

export default PinSignup;
