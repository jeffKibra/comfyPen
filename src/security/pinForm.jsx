import React from "react";
import { useForm } from "react-hook-form";
import MyNav from "../navs/myNav";

function PinForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.next(data);
  };

  return (
    <>
      <nav>
        <MyNav />
      </nav>

      <div className="container unfixed">
        <div className="card col col-sm-6 col-md-4 col-lg-3 bg-info mx-auto my-3">
          <div className="card-body mx-auto">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <small className="form-text text-light">
                Enter your pin to continue!
              </small>

              <div className="form-group">
                <label htmlFor="pin">
                  <p className=" my-0 py-0 d-inline text-left text-warning ">
                    Pin: *{errors?.pin?.message}
                  </p>
                </label>
                <input
                  name="pin"
                  type="password"
                  ref={register({
                    required: {
                      value: true,
                      message: "please provide a surname"
                    },
                    minLength: {
                      value: 4,
                      message: "your pin must be atleast 4 characters long"
                    }
                  })}
                  className="form-control"
                  placeholder="pin"
                />
              </div>

              <button type="submit" className="btn btn-outline-warning">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PinForm;
