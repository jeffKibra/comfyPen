import React from "react";
import KeyFormComponent from "./keyFormComponent";
import PropTypes from "prop-types";
import FormHOC from "../component/formHOC";

function KeyForm(props) {
  const { register, errors, watch } = props;
  return (
    <>
      <KeyFormComponent register={register} errors={errors} watch={watch} />
    </>
  );
}

KeyForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormHOC(KeyForm);
