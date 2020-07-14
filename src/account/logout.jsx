import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAsync } from "./authRedux";
import LogoutComponent from "./logoutComponent";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  logoutAsync: () => dispatch(logoutAsync()),
});

function Logout(props) {
  const history = useHistory();

  useEffect(() => {
    const { uid } = props.firebase.auth;
    if (!uid) history.push("/account");
  }, [props.firebase.auth, history]);

  const onLogout = () => {
    props.logoutAsync();
  };

  return (
    <>
      <LogoutComponent onLogout={onLogout} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
