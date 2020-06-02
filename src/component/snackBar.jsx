import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <button
        style={{ display: "none" }}
        id="snackBarTrigger"
        onClick={handleClick}
      >
        Open simple snackbar
      </button>{" "}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.msg}
      />{" "}
    </div>
  );
}
