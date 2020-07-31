import React from "react";
import CustomDialogue from "../component/customDialogue";
import PropTypes from "prop-types";

function DeleteDialogue(props) {
  const onTrashClick = () => {
    props.onTrashClick();
  };

  return (
    <>
      <CustomDialogue
        confirm={onTrashClick}
        title="delete"
        description="Are you sure you want to delete this entry? Please note that this
        action cannot be undone!"
        render={(handleClickOpen) => (
          <span onClick={handleClickOpen}>delete</span>
        )}
      />
    </>
  );
}

DeleteDialogue.propTypes = {
  onTrashClick: PropTypes.func.isRequired,
};

export default DeleteDialogue;
