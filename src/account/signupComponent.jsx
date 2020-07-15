import React from "react";
import logo from "../diary144.png";
import EmailForm from "./emailForm";
import PasswordForm from "./passwordForm";
import SnackBar from "../component/snackBar";
import PropTypes from "prop-types";

function SignupComponent(props) {
  console.log(props);
  const {
    current,
    validated,
    email,
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
                onFormSubmit={validateMail}
              />
            )}
          </div>
          <div>
            {current === 1 && (
              <>
                <h6>{email}</h6>
                <PasswordForm prev={prev} onFormSubmit={onFormSubmit} />
              </>
            )}
          </div>
        </div>
      </div>
      <SnackBar />
    </>
  );
}

SignupComponent.propTypes = {
  current: PropTypes.number.isRequired,
  validated: PropTypes.bool,
  email: PropTypes.string,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  validateMail: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default SignupComponent;
