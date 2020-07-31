import React, { Component } from "react";
import PinLogin from "../security/pinLogin";
import db from "../component/dbaccess";
import { setKey, isLogged, checkKey } from "../component/redux";
import { connect } from "react-redux";

const mapStateToKey = (state) => ({
  securityKey: state.securityKey,
  logged: state.logged,
  storageKey: state.storageKey,
});
const mapDispatchToKey = (dispatch) => ({
  setKey: (data) => dispatch(setKey(data)),
  checkKey: (data) => dispatch(checkKey(data)),
  isLogged: (data) => dispatch(isLogged(data)),
});

class KeyConstruct extends Component {
  componentDidMount() {
    db.secret.count().then((value) => {
      if (value === 0) {
        if (this.props.storageKey) {
          this.props.checkKey({ storageKey: false });
        }
      } else {
        if (!this.props.storageKey) {
          this.props.checkKey({ storageKey: true });
        }
      }
    });
  }

  PinSignup = (data) => {
    const keyData = {
      key: data.key,
    };
    db.secret
      .add(keyData)
      .then(() => {
        this.props.checkKey({ storageKey: true });
      })
      .catch((e) => {
        alert("Error: " + (e.stack || e));
      });
  };

  access = (data) => {
    console.log(data);
    db.secret
      .where(data)
      .count()
      .then((value) => {
        if (value === 0) {
          alert("invalid key");
        } else {
          this.props.setKey(data);
        }
      });
  };

  render() {
    if (this.props.storageKey) {
      return (
        <PinLogin securityKey={this.props.securityKey} access={this.access} />
      );
    } else {
      return <p>plus</p>;
    }
  }
}

const Key = connect(mapStateToKey, mapDispatchToKey)(KeyConstruct);

export default Key;
