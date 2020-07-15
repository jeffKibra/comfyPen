import React, { Component } from "react";
import PinForm from "./pinForm";
import PinSignup from "./pinSignup";
import $ from "jquery";
import LoginHOC from "./loginHOC";

class PinChange extends Component {
  state = {
    current: 0,
  };

  next = async (data) => {
    const { access } = this.props;
    const current = this.state.current + 1;
    access(data)
      .then((val) => {
        if (val === 0) throw new Error("Invalid Pin!");
        return val;
      })
      .then(() => {
        this.setState({ current });
      })
      .catch((err) => {
        this.props.setMsg({ msg: err.message });
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
            <PinForm onFormSubmit={this.next} />
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

export default LoginHOC(PinChange);
