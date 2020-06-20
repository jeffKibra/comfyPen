import React from "react";
import { connect } from "react-redux";
import OnlineList from "./onlineList";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapStateToProps = (state, ownProps) => {
  const journalId = ownProps.match.params.journalId;
  const { auth } = state.firebase;

  const { journals } = state.firestore.data;
  const journal = journals ? journals[journalId] : {};
  const entriesList = state.firestore.ordered.entries;
  const entries = entriesList ? entriesList : [];
  return { journal, entries, auth, journalId };
};

function OnlineReaderConstruct(props) {
  const journalId = props.match.params.journalId;
  const { entries, journal } = props;

  return (
    <>
      <OnlineList journal={journal} entries={entries} />
      <Link
        to={"/write/" + journalId}
        aria-controls="write-Link"
        className="btn btn-outline-primary write-btn"
      >
        <FontAwesomeIcon icon="pen-alt" />
      </Link>
    </>
  );
}

const OnlineReader = connect(mapStateToProps)(OnlineReaderConstruct);

export default withRouter(OnlineReader);
