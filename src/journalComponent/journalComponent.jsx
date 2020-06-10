import React from "react";
import { connect } from "react-redux";
import EditableContainer from "./editableContainer";
import CreateNewJournal from "./createJournal";
import PinLogin from "../security/pinLogin";

const mapStateToJournalComponent = (state) => {
  return state;
};

function JournalComponentConstruct(props) {
  const { status, refreshJournal } = props;
  const myJournals = props.journals.map((journal, index) => (
    <EditableContainer
      refreshJournal={refreshJournal}
      key={index}
      journal={journal}
    />
  ));

  if (props.storageKey) {
    if (!!props.securityKey) {
      return (
        <Main
          refreshJournal={refreshJournal}
          myJournals={myJournals}
          status={status}
        />
      );
    } else {
      return <PinLogin />;
    }
  } else {
    return (
      <Main
        refreshJournal={refreshJournal}
        myJournals={myJournals}
        status={status}
      />
    );
  }
}

function Main(props) {
  const { myJournals, refreshJournal, status } = props;

  return (
    <div>
      <div className="row">{myJournals}</div>
      <div className="row">
        {" "}
        <CreateNewJournal refreshJournal={refreshJournal} />
      </div>
    </div>
  );
}

const JournalComponent = connect(mapStateToJournalComponent)(
  JournalComponentConstruct
);

export default JournalComponent;
