import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import MyDrawer from "./drawer";
import NavBody from "./navBody";
import { SwipeableDrawer } from "@material-ui/core";
import { useStyles } from "../theme/theme";

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.location.pathname
    .split("/")
    .filter((val) => val !== "");
  const loading = state.custom.loading;
  const journalId = path[0] === "onlineList" ? path[1] : "";
  const journals = state.firestore.data.journals;
  const journal = journals ? journals[journalId] : {};
  const { auth, profile } = state.firebase;
  const nameArray = auth.displayName ? auth.displayName.split(" ") : [];
  const { firstName, lastName } = profile;
  const letter1 = auth.uid
    ? nameArray[0]
      ? nameArray[0].charAt(0)
      : firstName.charAt(0)
    : "";
  const letter2 = auth.uid
    ? nameArray[1]
      ? nameArray[1].charAt(0)
      : lastName.charAt(0)
    : "";
  const name = {
    firstName: nameArray[0] || firstName || "",
    lastName: nameArray[1] || lastName || "",
    initials: letter1 + letter2,
  };
  //console.log({ nameArray, name });

  return { auth, profile, journalId, journal, loading, name };
};

function MainNav(props) {
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

  const { journal, loading, name } = props;

  return (
    <>
      <NavBody
        journal={journal}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleMenu={handleMenu}
        classes={classes}
        toggleDrawer={toggleDrawer}
        popMenu={popMenu}
        loading={loading}
        name={name}
      ></NavBody>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <MyDrawer
          classes={classes}
          toggleDrawer={toggleDrawer}
          anchor="left"
          name={name}
        />
      </SwipeableDrawer>
    </>
  );
}

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const { auth } = props;
    const journalListener = {
      collection: "users",
      doc: auth?.uid,
      subcollections: [
        { collection: "journals", orderBy: ["journalName", "desc"] },
      ],
      storeAs: "journals",
    };

    return auth?.uid ? [journalListener] : [];
  })
)(MainNav);
