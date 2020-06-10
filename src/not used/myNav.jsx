import React, { useState } from "react";
import clsx from "clsx";
import { Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
import $ from "jquery";
import FetchJournalList from "../component/fetchJournalList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Menu as MaterialMenu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8" },
  toolBar: { backgroundColor: "#17a2b8" },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const { SubMenu } = Menu;

function Nav(props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const refreshJournal = () => {
    $("#refresh").trigger("click");
    handleClose();
  };
  const handleClick = (e) => {
    //console.log("click ", e);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon="home" />
          </ListItemIcon>
          <ListItemText primary="home" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon="user" />
          </ListItemIcon>
          <ListItemText primary="account" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FontAwesomeIcon icon="user-shield" />
          </ListItemIcon>
          <ListItemText primary="privacy" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

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
              <FontAwesomeIcon icon="bars" />
              {"  "}
            </IconButton>{" "}
            <Typography variant="h6" className={classes.title}>
              {" "}
              ComfyPen{" "}
            </Typography>{" "}
            <FetchJournalList />
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
                <FontAwesomeIcon icon="ellipsis-v" />{" "}
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
                <MenuItem onClick={refreshJournal}>refresh</MenuItem>{" "}
              </MaterialMenu>{" "}
            </div>{" "}
          </Toolbar>{" "}
        </AppBar>{" "}
      </div>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </>
  );
}

export default Nav;
