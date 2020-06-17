import React from "react";
import Spinner from "../component/spinner";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function EmailForm(props) {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur | onChange",
  });

  const { msg, status, validateMail } = props;

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
    validateMail(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">
            <p className=" my-0 py-0 d-inline text-left">
              Email:{" "}
              <small className="text-danger ">*{errors?.email?.message}</small>
            </p>
          </label>
          <input
            ref={register({
              required: { value: true, message: "please provide an email" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            })}
            type="email"
            name="email"
            className="form-control"
            placeholder="email"
          />
        </div>
        <div className="form-check">
          <input
            ref={register({
              required: { value: true },
            })}
            className="form-check-input"
            type="checkbox"
            name="read"
          />
          <label className="form-check-label">
            I have read and agree to the <Link to="/terms">terms of use</Link>{" "}
            and the <Link to="/privacy"> privacy policy</Link>
          </label>
        </div>
        <button
          type="submit"
          disabled={!watch("read")}
          className="btn btn-outline-info my-3"
        >
          Check {"  "} <Spinner status={status} />
        </button>
        <p className="text-danger">{msg}</p>
      </form>
    </>
  );
}

export default EmailForm;
