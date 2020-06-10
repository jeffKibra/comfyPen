import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import db from "../component/dbaccess";
import { useHistory } from "react-router-dom";
import ReadOnline from "./readOnline";
import ReadOffline from "./readOffline";
import { setActiveEntry } from "../component/redux";
import SnackBar from "../component/snackBar";

const mapStateToRead = (state) => {
  return state;
};

const mapDispatchToRead = (dispatch) => ({
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

function ReadConstruct(props) {
  const [online, setOnline] = useState(true);
  const history = useHistory();

  const entryIdStatus = !!props.activeEntry.entryId;

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

  useEffect(() => {
    if (!entryIdStatus) {
      db.activeEntry.toArray().then((val) => {
        if (val.length === 0) return history.push("/");
        props.setActiveEntry(val[0]);
        choose(val[0].entryId);
      });
    } else {
      choose(props.activeEntry.entryId);
    }
  }, []);

  return (
    <div>
      {online === true ? <ReadOnline /> : <ReadOffline />} <SnackBar />
    </div>
  );
}

const Read = connect(mapStateToRead, mapDispatchToRead)(ReadConstruct);

export default Read;
