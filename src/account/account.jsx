import React, { Component } from "react";
import { isLogged } from "../component/redux";
import { connect } from "react-redux";
import AccountComponent from "./accountComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { firebase } = state;
  //console.log(state);
  return firebase;
};

const mapDispatchToProps = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
});

class Account extends Component {
  state = {
    loggedIn: [],
    loggedOut: [],
    body: [
      {
        name: "login",
        description: "Login to access your account",
        path: "/login",
      },
      {
        name: "signup",
        description: "Don't have an account? Signup.",
        path: "/signup",
      },
      {
        name: "logout",
        description: "Do a clean up",
        path: "/logout",
      },
    ],
  };

  componentDidMount() {
    const loggedIn = this.state.body.filter((card) => card.name === "logout");
    const loggedOut = this.state.body.filter((card) => card.name !== "logout");
    this.setState({ loggedIn, loggedOut });
  }

  render() {
    const { loggedIn, loggedOut } = this.state;
    const { firebase } = this.props;
    const { uid } = firebase.auth;
    const cards = uid ? loggedIn : loggedOut;

    return (
      <>
        <AccountComponent firebase={firebase} cards={cards} />
      </>
    );
  }
}

Account.propTypes = {
  firebase: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
