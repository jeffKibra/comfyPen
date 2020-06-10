import React, { useState } from "react";
import { connect } from "react-redux";
import db from "../component/dbaccess";
import UpdaterOnline from "./updaterOnline";
import UpdaterOffline from "./updaterOffline";
import { useHistory } from "react-router-dom";
import { setActiveEntry } from "../component/redux";
import SnackBar from "../component/snackBar";

const mapStateToUpdater = (state) => {
  return state;
};

const mapDispatchToUpdater = (dispatch) => ({
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

function UpdaterConstruct(props) {
  const [online, setOnline] = useState(true);
  const history = useHistory();

  const entryIdState = !!props.activeEntry.entryId;

  const choose = (entryId) => {
    db.savedEntries
      .where("entryId")
      .equals(entryId)
      .count()
      .then((val) => {
        if (val <= 0) {
          db.unsavedEntries
            .where("entryId")
            .equals(entryId)
            .count()
            .then((val) => {
              if (val <= 0) {
                console.log("invalidEntry");
              } else {
                setOnline(false);
              }
            });
        } else {
          setOnline(true);
        }
      });
  };

  if (!entryIdState) {
    db.activeEntry.toArray().then((val) => {
      if (val.length === 0) return history.push("/");
      props.setActiveEntry(val[0]);
      choose(val[0].entryId);
    });
  } else {
    choose(props.activeEntry.entryId);
  }

  return (
    <div>
      {online === true ? <UpdaterOnline /> : <UpdaterOffline />} <SnackBar />
    </div>
  );
}

const Updater = connect(
  mapStateToUpdater,
  mapDispatchToUpdater
)(UpdaterConstruct);

export default Updater;
