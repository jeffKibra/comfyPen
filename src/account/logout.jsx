import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAsync } from "./authRedux";
import CustomDialogue from "../component/customDialogue";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { useStyles } from "../theme/theme";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  logoutAsync: () => dispatch(logoutAsync()),
});

function Logout(props) {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const { uid } = props.firebase.auth;
    if (!uid) history.push("/account");
  }, [props.firebase.auth, history]);

  const onLogout = () => {
    props.logoutAsync();
  };

  return (
    <>
      <CustomDialogue
        title="Sign-out"
        description=" Are you sure you want to logout? Please note that this action
              cannot be undone. Your secret pin will also be deleted! Continue!
            "
        confirm={onLogout}
        render={(handleClickOpen) => (
          <Button className={classes.margin} onClick={handleClickOpen}>
            sign out
          </Button>
        )}
      />
    </>
  );
}

Logout.propTypes = {
  logoutAsync: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
