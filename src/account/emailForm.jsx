import React from "react";
import Form from "../component/form";
import EmailFormComponent from "./emailFormComponent";

function EmailForm(props) {
  const { onFormSubmit } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <EmailFormComponent />
      </Form>
    </>
  );
}

export default EmailForm;
