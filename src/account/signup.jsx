import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { signupAsync, checkEmailAsync, next, prev } from "./authRedux";
import { setMsg } from "../component/redux";
import SignupComponent from "./signupComponent";

const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  const { email } = state.custom;
  return { email, auth };
};

const mapDispatchToProps = (dispatch) => ({
  signupAsync: (data) => dispatch(signupAsync(data)),
  checkEmailAsync: (email) => dispatch(checkEmailAsync(email)),
  setMsg: (msg) => dispatch(setMsg(msg)),
  next: () => dispatch(next()),
  prev: () => dispatch(prev()),
});

function Signup(props) {
  const { email, next, prev } = props;

  useEffect(() => {
    if (props.auth.uid) {
      props.history.push("/");
    }
  }, [props.auth, props.history]);

  const validateMail = (data) => {
    props.checkEmailAsync({ email: data.email });
  };

  const onFormSubmit = (formData) => {
    props.setMsg({ msg: "" });
    const signupData = {
      ...formData,
      email,
    };
    props.signupAsync(signupData);
    //console.log(signupData);
  };

  return (
    <>
      <SignupComponent
        next={next}
        prev={prev}
        validateMail={validateMail}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
