import React from "react";
import { useForm } from "react-hook-form";

function FormHOC(WrappedComponent) {
  return function HOC(props) {
    //console.log(props);
    const {
      register,
      errors,
      handleSubmit,
      watch,
      setValue,
      getValues,
    } = useForm({
      mode: "onChange",
    });
    const onFormSubmit = (data, e) => {
      e.target.reset();
      props.onFormSubmit(data);
    };

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <WrappedComponent
          {...props}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          getValues={getValues}
        />
      </form>
    );
  };
}

export default FormHOC;
