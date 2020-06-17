import React from "react";
import { useForm } from "react-hook-form";
import SnackBar from "../component/snackBar";

const KeyForm = (props) => {
  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.onSubmit(data);
  };
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
  });

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h6 className="form-text">
          Please create a pin to secure your journals
        </h6>
        <div className="form-group">
          <label htmlFor="pin">
            <p className=" my-0 py-0 d-inline text-left  ">
              Pin: <span className="text-danger">*{errors?.pin?.message}</span>
            </p>
          </label>
          <input
            name="pin"
            type="password"
            ref={register({
              required: {
                value: true,
                message: "please provide a pin",
              },
              minLength: {
                value: 4,
                message: "your pin must be atleast 4 characters long",
              },
            })}
            className="form-control"
            placeholder="pin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm pin">
            <p className=" my-0 py-0 d-inline text-left  ">
              confirmPin:
              <span className="text-danger">
                *{errors?.confirmpin?.message}
              </span>
            </p>
          </label>
          <input
            name="confirmpin"
            type="password"
            ref={register({
              validate: (value) =>
                value === watch("pin") || "pins do not match",
              required: {
                value: true,
                message: "please confirm your pin",
              },
            })}
            className="form-control"
            placeholder="confirmpin"
          />
        </div>

        <button type="submit" className="btn btn-outline-info">
          create
        </button>
      </form>
      <SnackBar />
    </>
  );
};

export default KeyForm;
