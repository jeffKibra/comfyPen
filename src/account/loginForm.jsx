import React from "react";
import FormHOC from "../component/formHOC";
import LoginFormComponent from "./loginFormComponent";

function LoginForm(props) {
  const { register, errors } = props;
  return (
    <>
      <LoginFormComponent register={register} errors={errors} />
    </>
  );
}

export default FormHOC(LoginForm);
