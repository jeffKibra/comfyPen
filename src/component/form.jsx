import React, { cloneElement } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { msg, loading } = state.custom;
  const status = loading;
  return { msg, status };
};

function Form(props) {
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

  const { msg, status } = props;

  const onFormSubmit = (data, e) => {
    e.target.reset();
    props.onFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {cloneElement(props.children, {
        register,
        errors,
        watch,
        setValue,
        getValues,
        status,
        msg,
      })}
    </form>
  );
}

Form.propTypes = {
  msg: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Form);
