import React from "react";
import { connect } from "react-redux";
import { signupAsync, checkEmailAsync, next, prev } from "./authRedux";
import { setMsg } from "../component/redux";
import SignupComponent from "./signupComponent";

const mapStateToProps = (state) => {
  const { email } = state.custom;
  return { email };
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

  const validateMail = (data) => {
    console.log(data);
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
