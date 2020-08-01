import React from "react";
import FormHOC from "../component/formHOC";
import PinFormComponent from "./pinFormComponent";
import PropTypes from "prop-types";

function PinForm(props) {
  const { register, errors } = props;
  return (
    <>
      <PinFormComponent register={register} errors={errors} />
    </>
  );
}

PinForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default FormHOC(PinForm);
