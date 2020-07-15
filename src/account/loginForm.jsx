import React from "react";
import Form from "../component/form";
import LoginFormComponent from "./loginFormComponent";

function LoginForm(props) {
  const { onFormSubmit } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <LoginFormComponent />
      </Form>
    </>
  );
}

export default LoginForm;
