import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div>
      <span variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Entry?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry? Please note that this
            action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="btn btn-outline-warning"
            autoFocus
          >
            cancel {"    "}
            <FontAwesomeIcon icon="times" />
          </button>
          <button onClick={onTrashClick} className="btn btn-outline-danger">
            delete {"    "}
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
