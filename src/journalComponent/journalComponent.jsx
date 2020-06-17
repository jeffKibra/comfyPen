import React from "react";
import { connect } from "react-redux";
import EditableContainer from "./editableContainer";
import CreateNewJournal from "./createJournal";
import PinLogin from "../security/pinLogin";

const mapStateToProps = (state) => {
  const { auth } = state.firebase;
  const { ordered } = state.firestore;
  return { ordered, auth };
};

function JournalComponent(props) {
  const { status } = props;
  const journals = props.ordered.journals;
  const myJournals = journals
    ? props.ordered.journals.map((journal, index) => (
        <EditableContainer key={index} journal={journal} />
      ))
    : [];

  if (props.storageKey) {
    if (!!props.securityKey) {
      return <Main myJournals={myJournals} status={status} />;
    } else {
      return <PinLogin />;
    }
  } else {
    return <Main myJournals={myJournals} status={status} />;
  }
}

function Main(props) {
  const { myJournals } = props;

  return (
    <div>
      <div className="row">{myJournals}</div>
      <div className="row">
        {" "}
        <CreateNewJournal />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(JournalComponent);

/* firestoreConnect((props) => [
    {
      collection: "users",
      doc: props.firebase.auth?.uid,
      subcollections: [{ collection: "journals" }],
      storeAs: "journals",
    }, // or `todos/${props.todoId}`
  ]), */
