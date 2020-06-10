import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const ReadBtn = () => {
  const history = useHistory();
  const read = () => {
    history.goBack();
  };
  return (
    <button
      onClick={read}
      aria-controls="write-button"
      className="btn btn-outline-primary write-btn"
      style={{ fontSize: "1.5rem" }}
    >
      <FontAwesomeIcon icon="book-open" />
    </button>
  );
};

export default ReadBtn;
