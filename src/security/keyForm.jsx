import React from "react";
import Form from "../component/form";
import KeyFormComponent from "./keyFormComponent";
import PropTypes from "prop-types";

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

KeyForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default KeyForm;
