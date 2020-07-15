import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { signupAsync, checkEmailAsync, next, prev } from "./authRedux";
import { setMsg } from "../component/redux";
import SignupComponent from "./signupComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { current, validated, email } = state.custom;
  const auth = state.firebase.auth;
  return { email, auth, current, validated };
};

const mapDispatchToProps = (dispatch) => ({
  signupAsync: (data) => dispatch(signupAsync(data)),
  checkEmailAsync: (email) => dispatch(checkEmailAsync(email)),
  setMsg: (msg) => dispatch(setMsg(msg)),
  next: () => dispatch(next()),
  prev: () => dispatch(prev()),
});

function Signup(props) {
  const {
    email,
    current,
    validated,
    auth,
    history,
    next,
    prev,
    setMsg,
    signupAsync,
    checkEmailAsync,
  } = props;

  useEffect(() => {
    if (auth.uid) {
      history.push("/");
    }
  }, [auth, history]);

  const validateMail = (data) => {
    checkEmailAsync({ email: data.email });
  };

  const onFormSubmit = (formData) => {
    setMsg({ msg: "" });
    const signupData = {
      ...formData,
      email,
    };
    signupAsync(signupData);
    //console.log(signupData);
  };

  return (
    <>
      <SignupComponent
        email={email}
        current={current}
        validated={validated}
        next={next}
        prev={prev}
        validateMail={validateMail}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}

Signup.propTypes = {
  email: PropTypes.string,
  current: PropTypes.number.isRequired,
  validated: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  signupAsync: PropTypes.func.isRequired,
  checkEmailAsync: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
