import React from "react";
import { connect } from "react-redux";
import OnlineList from "./onlineList";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compose } from "recompose";
import { Fab } from "@material-ui/core";
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";

const mapStateToProps = (state, ownProps) => {
  const journalId = ownProps.match.params.journalId;
  const { auth } = state.firebase;

  const { journals } = state.firestore.data;
  const journal = journals ? journals[journalId] : {};
  const entriesList = state.firestore.ordered.entries;
  const entries = entriesList ? entriesList : [];
  return { journal, entries, auth, journalId };
};

function OnlineReader(props) {
  //console.log(props);
  const journalId = props.match.params.journalId;
  const history = props.history;
  const { entries, journal } = props;
  const classes = useStyles();

  const write = () => {
    history.push("/write/" + journalId);
  };

  return (
    <>
      <OnlineList journal={journal} entries={entries} />
      <Fab onClick={write} className={classes.fab} aria-controls="write-Link">
        <FontAwesomeIcon icon="pen-alt" />
      </Fab>
    </>
  );
}

OnlineReader.propTypes = {
  journal: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const { journalId, auth } = props;
    const entriesListener = {
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
    };

    return journalId ? [entriesListener] : [];
  })
)(OnlineReader);
