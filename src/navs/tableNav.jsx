import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { closeJournal } from "../component/redux";

const mapDispatchToTableNav = dispatch => ({
  closeJournal: () => dispatch(closeJournal())
});

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, backgroundColor: "#17a2b8" },
  toolBar: { backgroundColor: "#17a2b8" },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 }
}));

function TableNavConstruct(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchToOffline = () => {
    props.switchToOffline();
    handleClose();
  };

  const closeJournal = () => {
    props.closeJournal();
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
            onClick={closeJournal}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {" "}
            <ArrowLeftOutlined />
          </IconButton>{" "}
          <Typography variant="h6" className={classes.title}>
            {" "}
            {props.journalname}-Saved Entries{" "}
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
              <MenuItem onClick={switchToOffline}>Unsaved</MenuItem>{" "}
              <MenuItem onClick={props.onWrite}>Write</MenuItem>{" "}
            </Menu>{" "}
          </div>{" "}
        </Toolbar>{" "}
      </AppBar>{" "}
    </div>
  );
}

const TableNav = connect(null, mapDispatchToTableNav)(TableNavConstruct);

export default TableNav;
