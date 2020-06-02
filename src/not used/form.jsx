import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../component/forminput";

function Form(props) {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange"
  });

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.onFormSubmit(data);
  };

  const { btnText, formData, online, signupMsg, onFormClose } = props;
  const myForm = formData.map((data, index) => (
    <FormInput
      key={index}
      name={data.name}
      type={data.type}
      value={data.value}
      register={register}
      watch={watch}
      errors={errors[data.name]}
      required
    />
  ));

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {myForm}
      <div className="btn-group my-2">
        <Button
          signupMsg={signupMsg}
          onFormClose={onFormClose}
          online={online}
          btnText={btnText}
        />
      </div>
    </form>
  );
}

function Spinner(props) {
  if (props.online) {
    return (
      <span role="status" className="spinner-border spinner-border-sm "></span>
    );
  } else {
    return "";
  }
}

function Button(props) {
  const { btnText, online, onFormClose } = props;
  return (
    <React.Fragment>
      <button className="btn btn-outline-primary">
        {btnText} <i className="fas fa-save"></i>
        <Spinner online={online} />
      </button>
      <button
        type="button"
        onClick={onFormClose}
        className="btn btn-outline-danger"
      >
        <i className="fas fa-times"></i>
      </button>
    </React.Fragment>
  );
}

export default Form;
