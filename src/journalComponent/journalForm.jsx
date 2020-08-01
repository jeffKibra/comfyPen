import React from "react";
import JournalFormComponent from "./journalFormComponent";
import PropTypes from "prop-types";
import FormHOC from "../component/formHOC";

function JournalForm(props) {
  //console.log(props);
  const {
    register,
    errors,
    onFormClose,
    btnText,
    journalName,
    journalDescription,
  } = props;
  return (
    <>
      <JournalFormComponent
        register={register}
        errors={errors}
        onFormClose={onFormClose}
        btnText={btnText}
        journalName={journalName}
        journalDescription={journalDescription}
      />
    </>
  );
}

JournalForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default FormHOC(JournalForm);
