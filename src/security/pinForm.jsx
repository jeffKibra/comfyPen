import React from "react";
import Form from "../component/form";
import PinFormComponent from "./pinFormComponent";

function PinForm(props) {
  return (
    <>
      <Form onFormSubmit={props.onFormSubmit}>
        <PinFormComponent />
      </Form>
    </>
  );
}

export default PinForm;
