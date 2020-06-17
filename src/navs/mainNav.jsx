import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import MyDrawer from "./drawer";
import NavBody from "./navBody";

import { SwipeableDrawer } from "@material-ui/core";
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

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.location.pathname
    .split("/")
    .filter((val) => val !== "");
  const journalId = path[0] === "onlineList" ? path[1] : "";
  const { auth } = state.firebase;
  return { auth, journalId };
};

function MainNavConstruct(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState(false);
  let popMenu;

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <NavBody
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleMenu={handleMenu}
        classes={classes}
        toggleDrawer={toggleDrawer}
        popMenu={popMenu}
      ></NavBody>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <MyDrawer classes={classes} toggleDrawer={toggleDrawer} anchor="left" />
      </SwipeableDrawer>
    </>
  );
}

const MainNav = compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const { journalId, auth } = props;
    const arr = journalId
      ? [
          {
            collection: "users",
            doc: auth?.uid,
            subcollections: [
              { collection: "journals", orderBy: ["journalName", "desc"] },
            ],
            storeAs: "journals",
          },
          {
            collection: "users",
            doc: auth?.uid,
            subcollections: [
              {
                collection: "journals",
                doc: journalId,
                subcollections: [
                  {
                    collection: "entries",
                    orderBy: ["createdAt", "desc"],
                    //limit: 10,
                  },
                ],
                storeAs: "entries",
              },
            ],
            storeAs: "entries",
          },
        ]
      : [
          {
            collection: "users",
            doc: auth?.uid,
            subcollections: [
              { collection: "journals", orderBy: ["journalName", "desc"] },
            ],
            storeAs: "journals",
          },
        ];
    return auth?.uid ? arr : [];
    // or `todos/${props.todoId}`
  })
)(MainNavConstruct);

export default withRouter(MainNav);
