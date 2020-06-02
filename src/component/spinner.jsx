import React from "react";

const Spinner = props => {
  if (props.status) {
    return (
      <>
        <span role="status" className="spinner-border spinner-border-sm"></span>
      </>
    );
  } else {
    return "";
  }
};

export default Spinner;
