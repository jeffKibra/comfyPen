import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function ConfirmComponent(props) {
  const { handleClickOpen, open, handleClose, onTrashClick } = props;

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

ConfirmComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
