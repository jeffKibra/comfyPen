import React from "react";
import { isLogged } from "../component/redux";
import { connect } from "react-redux";
import AccountComponent from "./accountComponent";
import PropTypes from "prop-types";
import { useStyles } from "../theme/theme";

const mapStateToProps = (state) => {
  const { firebase } = state;
  //console.log(state);
  return { firebase };
};

const mapDispatchToProps = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
});

function Account(props) {
  const classes = useStyles();
  const body = [
    {
      name: "logout",
      description: "Do a clean up",
      path: "/logout",
    },
  ];

  /*state = {
    loggedIn: [],
    loggedOut: [],
    
  };*/

  //console.log(props);

  const { firebase } = props;

  return (
    <>
      <AccountComponent classes={classes} firebase={firebase} cards={body} />
    </>
  );
}

Account.propTypes = {
  firebase: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
