import React from "react";
import { ErrorMessage } from "react-hook-form";

const FormInput = ({
  value,
  name,
  type,
  register,
  required,
  errors,
  watch
}) => {
  let errot;
  if (name === "password") {
    errot = {
      required: { value: true, message: "please provide a password" },
      minLength: {
        value: 8,
        message: "the password must be atleast 8 characters long"
      },
      pattern: {
        value: /^(?:[a-z]+[0-9]|[0-9]+[a-z])[a-z0-9]*$/i,
        message: "please include at least one character and number"
      }
    };
  } else if (name === "journalName") {
    errot = {
      required: { value: true, message: "please provide a journal name" },
      pattern: {
        value: /^[a-z0-9_., ]+$/i,
        message: "only numbers and characters allowed"
      },
      maxLength: { value: 20, message: "limited to 20 characters" }
    };
  } else if (name === "journalDescription") {
    errot = {
      required: {
        value: true,
        message: "please provide a journal description"
      },
      pattern: {
        value: /^[a-z0-9_., ]+$/i,
        message: "only numbers and characters allowed"
      },
      maxLength: { value: 50, message: "limited to 50 characters" }
    };
  } else if (name === "email") {
    errot = {
      required: { value: true, message: "please provide an email" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    };
  } else if (name === "firstname") {
    errot = {
      required: { value: true, message: "please provide a first name" },
      pattern: {
        value: /^[a-z0-9_., ]+$/i,
        message: "only numbers and characters allowed"
      }
    };
  } else if (name === "surname") {
    errot = {
      required: { value: true, message: "please provide a surname" },
      pattern: {
        value: /^[a-z0-9_., ]+$/i,
        message: "only numbers and characters allowed"
      }
    };
  } else if (name === "confirmPassword") {
    errot = {
      validate: value =>
        value === watch("password") || "passwords do not match",
      required: { value: true, message: "please confirm your password" }
    };
  } else if (name === "key") {
    errot = {
      required: { value: true, message: "please provide a surname" },
      minLength: {
        value: 4,
        message: "your key must be atleast 4 characters long"
      }
    };
  } else if (name === "confirmKey") {
    errot = {
      validate: value => value === watch("key") || "keys do not match",
      required: { value: true, message: "please confirm your key" }
    };
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>
        <p className=" my-0 py-0 d-inline text-left">
          {name}: <small className="text-danger ">*{errors?.message}</small>
        </p>
      </label>
      <input
        ref={register({ ...errot })}
        id={name}
        type={type}
        name={name}
        defaultValue={value}
        className="form-control"
        placeholder={name}
      />
    </div>
  );
};
export default FormInput;
