import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Popconfirm } from "antd";
import Spinner from "../component/spinner";

import { connect } from "react-redux";
import { closeJournal } from "../component/redux";

const mapDispatchToEntryNav = dispatch => ({
  closeJournal: () => dispatch(closeJournal())
});

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8" },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  toolBar: { backgroundColor: "#17a2b8" }
}));

function EntryNavConstruct(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditClick = () => {
    props.onEditClick();
    handleClose();
  };

  return (
    <div className={classes.root}>
      {" "}
      <AppBar position="fixed">
        {" "}
        <Toolbar className={classes.toolBar}>
          {" "}
          <IconButton
            edge="start"
            onClick={props.onView}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {" "}
            <ArrowLeftOutlined />
          </IconButton>{" "}
          <Typography variant="h6" className={classes.title}>
            {" "}
            Reading ...{" "}
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
              <MenuItem onClick={onEditClick}>Edit</MenuItem>{" "}
              <Popconfirm
                title="Are you sure you want to delete this entry?"
                onConfirm={props.onDelete}
                onCancel={props.cancel}
                okText="Yes"
                cancelText="No"
              >
                <MenuItem onClick={handleClose}>
                  Delete
                  <Spinner status={props.status} />
                </MenuItem>{" "}
              </Popconfirm>
            </Menu>{" "}
          </div>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
    </div>
  );
}

const EntryNav = connect(null, mapDispatchToEntryNav)(EntryNavConstruct);

export default EntryNav;
