import React from "react";
import JournalFormComponent from "./journalFormComponent";
import Form from "../component/form";
import PropTypes from "prop-types";

function JournalForm(props) {
  const { onFormSubmit } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <JournalFormComponent />
      </Form>
    </>
  );
}

JournalForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default JournalForm;
