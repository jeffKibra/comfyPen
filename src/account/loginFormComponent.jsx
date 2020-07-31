import React from "react";
import Spinner from "../component/spinner";
import FormInput from "../component/formInput";
import PropTypes from "prop-types";

function LoginFormComponent(props) {
  const { register, errors, status } = props;

  return (
    <>
      <h4 className="card-title">Please login to continue...</h4>
      <FormInput
        name="email"
        type="email"
        register={register}
        errors={errors}
        registerObject={{
          required: {
            value: true,
            message: "Please provide an Email!",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid Email Address",
          },
        }}
      />
      <FormInput
        name="password"
        type="password"
        register={register}
        errors={errors}
        registerObject={{
          required: {
            value: true,
            message: "Please provide a password!",
          },
          minLength: {
            value: 8,
            message: "Password must be atleast 8 characters long!",
          },
        }}
      />

      <span className="d-inline">
        <button className="btn btn-outline-info my-2">
          LOGIN {"  "}
          <Spinner status={status} />
        </button>
        {"  "}
      </span>
    </>
  );
}

LoginFormComponent.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  status: PropTypes.bool,
  msg: PropTypes.string,
};

export default LoginFormComponent;
