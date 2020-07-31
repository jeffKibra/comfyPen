import React from "react";
import Form from "../component/form";
import PinFormComponent from "./pinFormComponent";
import PropTypes from "prop-types";

function PinForm(props) {
  return (
    <>
      <Form onFormSubmit={props.onFormSubmit}>
        <PinFormComponent />
      </Form>
    </>
  );
}

PinForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default PinForm;
