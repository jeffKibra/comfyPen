import React from "react";
import { Link } from "react-router-dom";
import { Menu as MaterialMenu, IconButton, MenuItem } from "@material-ui/core";
import { MoreOutlined } from "@ant-design/icons";
import Confirm from "./confirm";

export default function MoreMenu(props) {
  const {
    anchorEl,
    handleMenu,
    handleClose,
    open,
    entry,
    onTrashClick,
  } = props;
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
        <Link to={"/edit/" + entry.entryId} style={{ color: "#000" }}>
          <MenuItem onClick={handleClose}>edit</MenuItem>{" "}
        </Link>
        <MenuItem onClick={handleClose}>
          <Confirm onTrashClick={onTrashClick} />
        </MenuItem>{" "}
      </MaterialMenu>{" "}
    </>
  );
}
