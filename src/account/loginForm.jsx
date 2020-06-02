import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../component/spinner";

function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.onFormSubmit(data);
  };

  const { status } = props;

  return (
    <>
      <h4 className="card-title">Please login to continue...</h4>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="form-group">
          <label htmlFor="email">
            <p className=" my-0 py-0 d-inline text-left text-warning ">
              Email: *{errors?.email?.message}
            </p>
          </label>
          <input
            name="email"
            type="email"
            ref={register({
              required: {
                value: true,
                message: "Please provide an Email!"
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid Email Address"
              }
            })}
            className="form-control"
            placeholder="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <p className="my-0 py-0 d-inline text-left text-warning ">
              {" "}
              Password: *{errors?.password?.message}
            </p>
          </label>
          <input
            name="password"
            type="password"
            ref={register({
              required: {
                value: true,
                message: "Please provide a password!"
              },
              minLength: {
                value: 8,
                message: "Password must be atleast 8 characters long!"
              }
            })}
            className="form-control"
            placeholder="password"
          />
        </div>

        <button className="btn btn-outline-warning my-2">
          LOGIN
          <Spinner status={status} />
        </button>
      </form>
    </>
  );
}

export default LoginForm;
