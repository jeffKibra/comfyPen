import React, { Component } from "react";
import PinForm from "./pinForm";
import PinSignup from "./pinSignup";
import db from "../component/dbaccess";
import $ from "jquery";
import { setMsg } from "../component/redux";
import { connect } from "react-redux";
import { encryptPin } from "../component/enctype";

const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class PinChange extends Component {
  state = {
    current: 0,
  };

  next = async (data) => {
    const current = this.state.current + 1;
    const hashedPin = await encryptPin(data.pin);
    db.pin
      .where("pin")
      .equals(hashedPin)
      .count()
      .then((val) => {
        if (val === 0) throw new Error("Invalid Pin!");
        return db.pin.clear();
      })
      .then(() => {
        this.setState({ current });
      })
      .catch((err) => {
        this.props.setMsg({ msg: "Invalid Pin" });
        $("#snackBarTrigger").trigger("click");
        console.log(err.message);
      });
  };

  render() {
    const { current } = this.state;

    return (
      <>
        {current === 0 && (
          <>
            <PinForm next={this.next} />
          </>
        )}
        {current === 1 && (
          <>
            <PinSignup />
          </>
        )}
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(PinChange);
