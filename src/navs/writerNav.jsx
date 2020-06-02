import React from "react";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { closeJournal } from "../component/redux";

const mapDispatchToWriterNav = dispatch => ({
  closeJournal: () => dispatch(closeJournal())
});

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8" },
  toolBar: { backgroundColor: "#17a2b8" },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 }
}));

function WriterNavConstruct(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onView = () => {
    props.onView();
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
            Text Writer{" "}
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
              <MenuItem onClick={onView}>Read</MenuItem>{" "}
            </Menu>{" "}
          </div>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
    </div>
  );
}

const WriterNav = connect(null, mapDispatchToWriterNav)(WriterNavConstruct);

export default WriterNav;
