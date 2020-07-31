import React from "react";
import { Menu as MaterialMenu, IconButton, MenuItem } from "@material-ui/core";
import { MoreOutlined } from "@ant-design/icons";
import DeleteDialogue from "./deleteDialogue";
import PropTypes from "prop-types";

export default function MoreMenu(props) {
  const { anchorEl, handleMenu, handleClose, open, onTrashClick, edit } = props;
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {" "}
        <MoreOutlined />{" "}
      </IconButton>{" "}
      <MaterialMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
      >
        {" "}
        <MenuItem onClick={edit}>edit</MenuItem>{" "}
        <MenuItem onClick={handleClose}>
          <DeleteDialogue onTrashClick={onTrashClick} />
        </MenuItem>{" "}
      </MaterialMenu>{" "}
    </>
  );
}

MoreMenu.propTypes = {
  edit: PropTypes.func.isRequired,
  anchorEl: PropTypes.any,
  handleMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
  onTrashClick: PropTypes.func.isRequired,
};
