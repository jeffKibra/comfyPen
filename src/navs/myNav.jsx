import React, { useState } from "react";
import { Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  Menu as MaterialMenu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  MoreOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  KeyOutlined
} from "@ant-design/icons";

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8" },
  toolBar: { backgroundColor: "#17a2b8" },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 }
}));

const { SubMenu } = Menu;

function Nav(props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const refreshJournal = () => {
    $("#refresh").trigger('click');
    handleClose();
  };
  const handleClick = e => {
    //console.log("click ", e);
  };

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
              onClick={showDrawer}
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {" "}
              <MenuOutlined />
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
                <MenuItem onClick={refreshJournal}>refresh</MenuItem>{" "}
              </MaterialMenu>{" "}
            </div>{" "}
          </Toolbar>{" "}
        </AppBar>{" "}
      </div>
      <Drawer
        title="Comfy Pen"
        width={300}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {" "}
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["home"]}
          defaultOpenKeys={["home"]}
          mode="inline"
        >
          <Menu.Item key="home">
            <HomeOutlined />
            <Link to="/">Home</Link>
          </Menu.Item>{" "}
          <SubMenu
            key="account"
            title={
              <span>
                {" "}
                <UserOutlined /> <span>My Account</span>{" "}
              </span>
            }
          >
            {" "}
            <Menu.ItemGroup key="accounttitle" title="Account Details">
              {" "}
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>{" "}
              <Menu.Item key="signup">
                <Link to="/signup">Sign up</Link>
              </Menu.Item>{" "}
              <Menu.Item key="logout">
                <Link to="/logout">Logout</Link>
              </Menu.Item>{" "}
            </Menu.ItemGroup>{" "}
          </SubMenu>{" "}
          <SubMenu
            key="security"
            title={
              <span>
                {" "}
                <SettingOutlined /> <span>Security Options</span>{" "}
              </span>
            }
          >
            <Menu.ItemGroup key="accounttitle" title="secure journals">
              <Menu.Item key="setpin">
                <KeyOutlined />
                <Link to="/pinSignup">Set Pin</Link>
              </Menu.Item>{" "}
              <Menu.Item key="changepin">
                <KeyOutlined />
                <Link to="/pinChange">Change Pin</Link>
              </Menu.Item>{" "}
              <Menu.Item key="pinDiscard">
                <KeyOutlined />
                <Link to="/pinDiscard">Discard Pin</Link>
              </Menu.Item>{" "}
            </Menu.ItemGroup>{" "}
          </SubMenu>{" "}
        </Menu>
      </Drawer>{" "}
    </>
  );
}

export default Nav;
