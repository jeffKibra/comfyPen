import React from "react";
import { useHistory } from "react-router-dom";
import {
  Menu as MaterialMenu,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";

import { MenuOutlined, MoreOutlined } from "@ant-design/icons";

export default function NavBody(props) {
  const history = useHistory();
  const {
    classes,
    handleClose,
    handleMenu,
    anchorEl,
    open,
    toggleDrawer,
  } = props;

  return (
    <>
      <div className={classes.root}>
        {" "}
        <AppBar position="fixed">
          {" "}
          <Toolbar className={classes.toolBar}>
            {" "}
            <IconButton
              edge="start"
              onClick={toggleDrawer("left", true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {" "}
              <MenuOutlined />
              {"  "}
            </IconButton>{" "}
            <Typography variant="h6" className={classes.title}>
              {" "}
              ComfyPen{" "}
            </Typography>{" "}
            <div>
              {" "}
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
                <span onClick={() => history.goBack()}>
                  <MenuItem onClick={handleClose}>
                    {"  "}Back{"   "}
                  </MenuItem>
                </span>
              </MaterialMenu>{" "}
            </div>{" "}
          </Toolbar>{" "}
        </AppBar>{" "}
      </div>
    </>
  );
}
