import React from "react";
import JournalFormComponent from "./journalFormComponent";
import Form from "../component/form";
import PropTypes from "prop-types";

function JournalForm(props) {
  const {
    onFormSubmit,
    onFormClose,
    btnText,
    journalName,
    journalDescription,
  } = props;
  return (
    <>
      <Form onFormSubmit={onFormSubmit}>
        <JournalFormComponent
          onFormClose={onFormClose}
          btnText={btnText}
          journalName={journalName}
          journalDescription={journalDescription}
        />
      </Form>
    </>
  );
}

JournalForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default JournalForm;
