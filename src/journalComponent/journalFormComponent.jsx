import React from "react";
import Spinner from "../component/spinner";
import PropTypes from "prop-types";
import FormInput from "../component/formInput";

function JournalFormComponent(props) {
  const {
    register,
    errors,
    status,
    msg,
    btnText,
    journalName,
    journalDescription,
    onFormClose,
  } = props;

  return (
    <>
      <FormInput
        name="journalName"
        type="text"
        register={register}
        errors={errors}
        defaultValue={journalName}
        registerObject={{
          required: {
            value: true,
            message: "please provide a journal name",
          },
          pattern: {
            value: /^[a-z0-9_., ]+$/i,
            message: "only numbers and characters allowed",
          },
          maxLength: { value: 20, message: "limited to 20 characters" },
        }}
      />
      <FormInput
        name="journalDescription"
        type="text"
        register={register}
        errors={errors}
        defaultValue={journalDescription}
        registerObject={{
          required: {
            value: true,
            message: "please provide a journal description",
          },
          pattern: {
            value: /^[a-z0-9_., ]+$/i,
            message: "only numbers and characters allowed",
          },
          maxLength: { value: 50, message: "limited to 50 characters" },
        }}
      />

      <div className="btn-group my-2 mx-auto">
        <button className="btn btn-outline-warning ">
          {btnText}
          <Spinner status={status} />
        </button>
        <button className="btn btn-outline-warning" onClick={onFormClose}>
          cancel{" "}
        </button>
        <p className="text-danger">{msg}</p>
      </div>
    </>
  );
}

JournalFormComponent.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  status: PropTypes.bool.isRequired,
  msg: PropTypes.string,
  btnText: PropTypes.string.isRequired,
  journalName: PropTypes.string.isRequired,
  journalDescription: PropTypes.string.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

export default JournalFormComponent;
