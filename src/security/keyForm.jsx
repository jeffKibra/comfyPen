import React from "react";
import Form from "../component/form";
import KeyFormComponent from "./keyFormComponent";

function KeyForm(props) {
  const { onFormSubmit } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <KeyFormComponent />
      </Form>
    </>
  );
}

export default KeyForm;
