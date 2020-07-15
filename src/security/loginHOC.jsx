import React, { Component } from "react";
import db from "../component/dbaccess";
import { setKey, setMsg } from "../component/redux";
import { connect } from "react-redux";
import $ from "jquery";
import { encryptPin } from "../component/enctype";

const mapStateToProps = (state) => ({
  securityKey: state.custom.securityKey,
  storageKey: state.custom.storageKey,
});

const mapDispatchToProps = (dispatch) => ({
  setKey: (data) => dispatch(setKey(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

export default function LoginHOC(WrappedComponent) {
  class HOC extends Component {
    access = async (data) => {
      const hashedPin = await encryptPin(data.pin);
      return db.pin
        .where("pin")
        .equals(hashedPin)
        .count()
        .then((val) => val)
        .catch((err) => {
          this.props.setMsg({ msg: err.message });
          $("#snackBarTrigger").trigger("click");
          console.log(err.message);
        });
    };

    render() {
      return (
        <WrappedComponent
          access={this.access}
          setKey={this.props.setKey}
          setMsg={this.props.setMsg}
        />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
}
