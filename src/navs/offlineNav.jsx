import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8", color: "#ffffff" },
  toolBar: { backgroundColor: "#17a2b8", color: "#ffffff" },
  menuButton: { marginRight: theme.spacing(2), color: "#ffffff" },
  title: { flexGrow: 1 }
}));

function OfflineNav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onWrite = () => {
    props.onWrite();
    handleClose();
  };

  return (
    <div className={classes.root}>
      {" "}
      <AppBar position="fixed">
        {" "}
        <Toolbar className={classes.toolBar}>
          {" "}
          <Link style={{ fontSize: 20 }} to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              {" "}
              <ArrowLeftOutlined />
            </IconButton>{" "}
          </Link>
          <Typography variant="h6" className={classes.title}>
            {" "}
            Comfy Pen{" "}
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleClose}
            >
              {" "}
              <MenuItem onClick={onWrite}>Write</MenuItem>{" "}
            </Menu>{" "}
          </div>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
    </div>
  );
}

export default OfflineNav;
