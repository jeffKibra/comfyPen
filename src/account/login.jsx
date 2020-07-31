import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginAsync } from "./authRedux";
import LoginComponent from "./loginComponent";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  loginAsync: (data) => dispatch(loginAsync(data)),
});

function Login(props) {
  const history = useHistory();
  const handleFormSubmit = (formData) => {
    props.loginAsync(formData);
  };

  useEffect(() => {
    const { uid } = props.firebase.auth;
    if (uid) history.push("/account");
  }, [props.firebase.auth, history]);

  const status = props.custom.loading;
  return (
    <>
      <LoginComponent status={status} handleFormSubmit={handleFormSubmit} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
