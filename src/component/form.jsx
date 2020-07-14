import React from "react";
import { useForm } from "react-hook-form";

function PasswordForm(props) {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onChange",
  });

  const { msg, status } = props;

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {props.children}
      <p className="text-danger">{msg}</p>
    </form>
  );
}

export default PasswordForm;
