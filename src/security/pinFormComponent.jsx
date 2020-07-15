import React from "react";
import FormInput from "../component/formInput";

function PinFormComponent(props) {
  const { register, errors, msg } = props;

  return (
    <div className="card col-sm-6 col-md-4 col-lg-3 bg-light mx-auto my-3">
      <div className="card-body mx-auto">
        <h6 className="form-text ">Enter your pin to continue!</h6>
        <FormInput
          name="pin"
          type="password"
          register={register}
          errors={errors}
          registerObject={{
            required: {
              value: true,
              message: "please provide a pin",
            },
            minLength: {
              value: 4,
              message: "your pin must be atleast 4 characters long",
            },
          }}
        />

        <button type="submit" className="btn btn-outline-info">
          Confirm
        </button>
        <p className="text-danger">{msg}</p>
      </div>
    </div>
  );
}

export default PinFormComponent;
