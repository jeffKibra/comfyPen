import React from "react";
import db from "../component/dbaccess";
import SnackBar from "../component/snackBar";
import KeyForm from "./keyForm";
import PagesNav from "../navs/pagesNav";
import { connect } from "react-redux";
import { checkKey } from "../component/redux";

const mapStateToPinSignup = (state) => {
  return state;
};

const mapDispatchToPinSignup = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

function PinSignupConstruct(props) {
  const pinSignup = (data) => {
    const keyData = {
      key: data.pin,
    };
    db.pin.clear().then(() => {
      db.pin
        .add(keyData)
        .then(() => {
          props.checkKey({ storageKey: true });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <>
      <nav>
        <PagesNav></PagesNav>
      </nav>
      <div className="container unfixed">
        <div className="card col col-sm-6 col-md-4 col-lg-3 mx-auto bg-info my-3">
          <div className="card-body mx-auto">
            <KeyForm onSubmit={pinSignup} />
          </div>
        </div>
        <SnackBar msg="pin set" />
      </div>
    </>
  );
}

const PinSignup = connect(
  mapStateToPinSignup,
  mapDispatchToPinSignup
)(PinSignupConstruct);

export default PinSignup;
