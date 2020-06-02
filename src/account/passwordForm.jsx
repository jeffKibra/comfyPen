import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../component/spinner";

function PasswordForm(props) {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onChange"
  });

  const { msg, status } = props;

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group">
        <label htmlFor="password">
          <p className=" my-0 py-0 d-inline text-left text-warning ">
            Password: *{errors?.password?.message}
          </p>
        </label>
        <input
          name="password"
          type="password"
          ref={register({
            required: { value: true, message: "please provide a password" },
            minLength: {
              value: 8,
              message: "the password must be atleast 8 characters long"
            },
            pattern: {
              value: /^(?:[a-z]+[0-9]|[0-9]+[a-z])[a-z0-9]*$/i,
              message: "please include at least one character and number"
            }
          })}
          className="form-control"
          placeholder="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">
          <p className=" my-0 py-0 d-inline text-left text-warning ">
            Confirm Password: *{errors?.confirmPassword?.message}
          </p>
        </label>
        <input
          name="confirmPassword"
          type="password"
          ref={register({
            validate: value =>
              value === watch("password") || "passwords do not match",
            required: { value: true, message: "please confirm your password" }
          })}
          className="form-control"
          placeholder="Confirm Password"
        />
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-warning my-3"
          onClick={props.prev}
        >
          Back
        </button>
        <button type="submit" className="btn btn-outline-warning my-3">
          Signup
          <Spinner status={status} />
        </button>
      </div>
      <p className="text-warning">{msg}</p>
    </form>
  );
}

export default PasswordForm;
