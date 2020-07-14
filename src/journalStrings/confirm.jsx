import React from "react";
import ConfirmComponent from "./confirmComponent";

export default function Confirm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTrashClick = () => {
    handleClose();
    props.onTrashClick();
  };

  return (
    <>
      <ConfirmComponent
        open={open}
        handleClickOpen={handleClickOpen}
        onTrashClick={onTrashClick}
        handleClose={handleClose}
      />
    </>
  );
}
