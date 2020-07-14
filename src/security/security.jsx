import React, { Component } from "react";
import { connect } from "react-redux";
import db from "../component/dbaccess";
import { checkKey } from "../component/redux";
import SecurityComponent from "./securityComponent";
import Cards from "./cards";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

class Security extends Component {
  state = {
    disabled: false,
    pins: [
      {
        name: "set pin",
        description: "Create a pin to safeguard your entries",
        path: "/setPin",
      },
      {
        name: "change pin",
        description: "change your pin",
        path: "/changePin",
      },
      {
        name: "discard pin",
        description:
          "Discard your pin! Please note that your journals will be viewed by anybody",
        path: "/discardPin",
      },
      {
        name: "Forgot pin",
        description:
          "Forgot your pin! Please note that you will have to login again!",
        path: "/logout",
      },
    ],
  };

  componentDidMount() {
    db.pin.count().then((val) => {
      if (val === 0) {
        this.props.checkKey({ storageKey: false });
      } else {
        this.props.checkKey({ storageKey: true });
      }
    });
  }

  render() {
    const { storageKey } = this.props.custom;
    //console.log(this.props);
    const isSet = this.state.pins.filter((card) => card.name !== "set pin");
    const notSet = this.state.pins.filter((card) => card.name === "set pin");

    const isSetCards = isSet.map((pin, index) => {
      return <Cards key={index} disabled={this.state.disabled} card={pin} />;
    });
    const notSetCards = notSet.map((pin, index) => {
      return <Cards key={index} disabled={this.state.disabled} card={pin} />;
    });
    return (
      <>
        <SecurityComponent
          storageKey={storageKey}
          isSetCards={isSetCards}
          notSetCards={notSetCards}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security);
