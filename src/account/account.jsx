import React, { Component } from "react";
import { isLogged } from "../component/redux";
import { connect } from "react-redux";
import AccountComponent from "./accountComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { firebase } = state;
  //console.log(state);
  return { firebase };
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
        name: "logout",
        description: "Do a clean up",
        path: "/logout",
      },
    ],
  };

  render() {
    console.log(this.props);
    const { body } = this.state;
    const { firebase } = this.props;

    return (
      <>
        <AccountComponent firebase={firebase} cards={body} />
      </>
    );
  }
}

Account.propTypes = {
  firebase: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
