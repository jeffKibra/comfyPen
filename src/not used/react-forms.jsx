import React from "react";
import { useForm } from "react-hook-form";

function ReactForm() {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur | onChange"
  });
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };
  const moreDetail = watch("moreDetail");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="onename"
        ref={register({ required: true, maxLength: 20 })}
        type="text"
      />
      {errors.onename && "total length must be less than 20"}
      <input
        type="text"
        name="lastname"
        ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
      />
      {errors.lastname && "Last name is required."}
      <input
        name="age"
        type="number"
        ref={register({ pattern: /\d+/, min: 18, max: 99 })}
      />
      {errors.age && "Please enter number for age"}
      <div>
        <label htmlFor="moreDetail">More details</label>
        <input name="moreDetail" type="checkbox" ref={register} />
      </div>
      {moreDetail && (
        <div>
          <label htmlFor="Interests">Interests</label>
          <input type="text" name="interests" ref={register} />
        </div>
      )}
      <input type="submit" />
    </form>
  );
}

export default ReactForm;
