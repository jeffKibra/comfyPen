import React from "react";
import Spinner from "../component/spinner";
import FormInput from "../component/formInput";
import PropTypes from "prop-types";

function PasswordFormComponent(props) {
  const { register, errors, watch, status, msg, prev } = props;

  return (
    <>
      <FormInput
        name="firstName"
        type="text"
        register={register}
        errors={errors}
        registerObject={{
          required: { value: true, message: "please provide a first name" },
          pattern: {
            value: /^[a-z0-9_., ]+$/i,
            message: "only numbers and characters allowed",
          },
        }}
      />
      <FormInput
        name="lastName"
        type="text"
        register={register}
        errors={errors}
        registerObject={{
          required: { value: true, message: "please provide a first name" },
          pattern: {
            value: /^[a-z0-9_., ]+$/i,
            message: "only numbers and characters allowed",
          },
        }}
      />
      <FormInput
        name="password"
        type="password"
        register={register}
        errors={errors}
        registerObject={{
          required: { value: true, message: "please provide a password" },
          minLength: {
            value: 8,
            message: "the password must be atleast 8 characters long",
          },
          pattern: {
            value: /^(?:[a-z]+[0-9]|[0-9]+[a-z])[a-z0-9]*$/i,
            message: "please include at least one character and number",
          },
        }}
      />
      <FormInput
        name="confirmPassword"
        type="password"
        register={register}
        errors={errors}
        registerObject={{
          validate: (value) =>
            value === watch("password") || "passwords do not match",
          required: { value: true, message: "please confirm your password" },
        }}
      />

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-info my-3"
          onClick={prev}
        >
          Back
        </button>
        <button type="submit" className="btn btn-outline-info my-3">
          Signup
          <Spinner status={status} />
        </button>
      </div>
      <p className="text-danger">{msg}</p>
    </>
  );
}

PasswordFormComponent.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  status: PropTypes.bool,
  msg: PropTypes.string,
  prev: PropTypes.func.isRequired,
};

export default PasswordFormComponent;
