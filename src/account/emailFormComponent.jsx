import React from "react";
import Spinner from "../component/spinner";
import { Link } from "react-router-dom";
import FormInput from "../component/formInput";
import FormCheck from "../component/formCheck";

function EmailFormComponent(props) {
  const { register, errors, watch, status } = props;

  return (
    <>
      <FormInput
        name="email"
        type="email"
        register={register}
        errors={errors}
        registerObject={{
          required: { value: true, message: "please provide an email" },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address",
          },
        }}
      />
      <FormCheck
        name="read"
        register={register}
        registerObject={{ required: { value: true } }}
        label={
          <p>
            I have read and agree to the <Link to="/terms"> terms of use</Link>{" "}
            and the <Link to="/privacy"> privacy policy</Link>
          </p>
        }
      />

      <button
        type="submit"
        disabled={!watch("read")}
        className="btn btn-outline-info my-3"
      >
        Check {"  "} <Spinner status={status} />
      </button>
    </>
  );
}

export default EmailFormComponent;
