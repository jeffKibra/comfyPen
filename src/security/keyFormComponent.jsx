import React from "react";
import FormInput from "../component/formInput";

const KeyFormComponent = (props) => {
  const { register, errors, watch } = props;

  return (
    <>
      <h6 className="form-text">Please create a pin to secure your journals</h6>
      <FormInput
        name="pin"
        type="password"
        errors={errors}
        register={register}
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

      <FormInput
        name="confirmPin"
        type="password"
        errors={errors}
        register={register}
        registerObject={{
          validate: (value) => value === watch("pin") || "pins do not match",
          required: {
            value: true,
            message: "please confirm your pin",
          },
        }}
      />

      <button type="submit" className="btn btn-outline-info">
        create
      </button>
    </>
  );
};

export default KeyFormComponent;
