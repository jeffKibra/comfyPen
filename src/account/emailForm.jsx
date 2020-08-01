import React from "react";
import FormHOC from "../component/formHOC";
import EmailFormComponent from "./emailFormComponent";

function EmailForm(props) {
  const { register, errors } = props;
  return (
    <>
      <EmailFormComponent register={register} errors={errors} />
    </>
  );
}

export default FormHOC(EmailForm);
