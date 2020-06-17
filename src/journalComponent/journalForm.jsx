import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "../component/spinner";

function JournalForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onFormSubmit = (data, e) => {
    props.onFormSubmit(data);
    e.target.reset();
  };

  const {
    status,
    loginsuccess,
    loginerror,
    btnText,
    journalName,
    journalDescription,
    onFormClose,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="form-group">
          <label htmlFor="JournalName">
            <p className=" my-0 py-0 d-inline text-left text-warning ">
              journalName: *{errors?.journalName?.message}
            </p>
          </label>
          <input
            name="journalName"
            type="text"
            ref={register({
              required: {
                value: true,
                message: "please provide a journal name",
              },
              pattern: {
                value: /^[a-z0-9_., ]+$/i,
                message: "only numbers and characters allowed",
              },
              maxLength: { value: 20, message: "limited to 20 characters" },
            })}
            className="form-control"
            placeholder="journalName"
            defaultValue={journalName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="JournalDescription">
            <p className="my-0 py-0 d-inline text-left text-warning ">
              {" "}
              journalDescription: *{errors?.journalDescription?.message}
            </p>
          </label>
          <input
            name="journalDescription"
            type="text"
            ref={register({
              required: {
                value: true,
                message: "please provide a journal description",
              },
              pattern: {
                value: /^[a-z0-9_., ]+$/i,
                message: "only numbers and characters allowed",
              },
              maxLength: { value: 50, message: "limited to 50 characters" },
            })}
            className="form-control"
            placeholder="journalDescription"
            defaultValue={journalDescription}
          />
        </div>

        <div className="btn-group my-2 mx-auto">
          <button className="btn btn-outline-warning ">
            {btnText}
            <Spinner status={status} />
          </button>
          <button className="btn btn-outline-warning" onClick={onFormClose}>
            cancel{" "}
          </button>
          {props.msg}
        </div>

        <p className="text-danger">{loginerror}</p>
        <p className="text-success">{loginsuccess}</p>
      </form>
    </div>
  );
}

export default JournalForm;
