import React from "react";
import Form from "../component/form";
import PasswordFormComponent from "./passwordFormComponent";

function PasswordForm(props) {
  const { onFormSubmit, prev } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <PasswordFormComponent prev={prev} />
      </Form>
    </>
  );
}

export default PasswordForm;
