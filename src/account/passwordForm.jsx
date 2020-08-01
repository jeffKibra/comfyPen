import React from "react";
import FormHOC from "../component/formHOC";
import PasswordFormComponent from "./passwordFormComponent";

function PasswordForm(props) {
  const { register, errors, watch, prev } = props;
  return (
    <>
      <PasswordFormComponent
        register={register}
        errors={errors}
        watch={watch}
        prev={prev}
      />
    </>
  );
}

export default FormHOC(PasswordForm);
