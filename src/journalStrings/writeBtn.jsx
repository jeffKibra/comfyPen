import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const WriteBtn = () => {
  const history = useHistory();
  const write = () => {
    history.push("/write");
  };
  return (
    <button
      onClick={write}
      aria-controls="write-button"
      className="btn btn-outline-primary write-btn"
    >
      <FontAwesomeIcon icon="pen-alt" />
    </button>
  );
};

export default WriteBtn;
