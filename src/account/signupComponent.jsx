import React from "react";
import logo from "../diary144.png";
import EmailForm from "./emailForm";
import PasswordForm from "./passwordForm";
import SnackBar from "../component/snackBar";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { loading, msg, current, validated, email } = state.custom;
  return { loading, msg, current, validated, email };
};

function SignupComponent(props) {
  const {
    msg,
    loading,
    current,
    validated,
    email,
    finish,
    next,
    prev,
    validateMail,
    onFormSubmit,
  } = props;

  return (
    <>
      <div className="card col-sm-9 col-md-7 col-lg-6 bg-light my-3 mx-auto ">
        <div className="card-body">
          <img
            src={logo}
            className=" img-fluid mx-auto d-block card-img-top text-center"
            style={{ width: "20%", height: "auto" }}
            alt="ComfyPen logo"
          />
          <div>
            {current === 0 && (
              <EmailForm
                next={next}
                prev={prev}
                validated={validated}
                status={loading}
                msg={msg}
                validateMail={validateMail}
              />
            )}
          </div>
          <div>
            {current === 1 && (
              <>
                <h6>{email}</h6>
                <PasswordForm
                  finish={finish}
                  next={next}
                  prev={prev}
                  status={loading}
                  msg={msg}
                  submitForm={onFormSubmit}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <SnackBar />
    </>
  );
}

export default connect(mapStateToProps)(SignupComponent);
