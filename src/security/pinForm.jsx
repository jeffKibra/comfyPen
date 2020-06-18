import React from "react";
import { useForm } from "react-hook-form";

function PinForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.next(data);
  };

  return (
    <>
      <div className="card col-sm-6 col-md-4 col-lg-3 bg-light mx-auto my-3">
        <div className="card-body mx-auto">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <h6 className="form-text ">Enter your pin to continue!</h6>

            <div className="form-group">
              <label htmlFor="pin">
                <p className=" my-0 py-0 d-inline text-left  ">
                  Pin:{" "}
                  <span className="text-danger">*{errors?.pin?.message}</span>
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

            <button type="submit" className="btn btn-outline-info">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PinForm;
