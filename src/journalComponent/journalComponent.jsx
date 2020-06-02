import React from "react";
import { connect } from "react-redux";
import EditableContainer from "./editableContainer";
import CreateNewJournal from "./createJournal";
import JournalPage from "../journalStrings/journalStringConstruct";
import MainBackdrop from "../component/backdrop";
import Nav from "../navs/myNav";
import OfflineDisplay from "../offline/offlineDisplay";
import DiaryDisplay from "../diary/diaryDisplay";
import PinLogin from "../security/pinLogin";

const mapStateToJournalComponent = state => {
  const storageKey = state.storageKey;
  const journalId = state.journalId;
  const securityKey = state.securityKey;
  const myJournals = state.journals.map(journal => ({
    ...journal
  }));
  return { myJournals, journalId, storageKey, securityKey };
};

function JournalComponentConstruct(props) {
  const { journalId, status, refreshJournal, diaryid } = props;
  const notDiary = props.myJournals.filter(
    journal => journal.journalid !== diaryid
  );
  const diary = props.myJournals.filter(
    journal => journal.journalid === diaryid
  );
  const myJournals = notDiary.map(journal => (
    <EditableContainer
      refreshJournal={refreshJournal}
      key={journal.journalid}
      journal={journal}
    />
  ));

  if (props.storageKey) {
    if (!!props.securityKey) {
      return (
        <Main
          refreshJournal={refreshJournal}
          myJournals={myJournals}
          diary={diary}
          status={status}
          journalId={journalId}
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
        diary={diary}
        status={status}
        journalId={journalId}
      />
    );
  }
}

function Main(props) {
  const { myJournals, refreshJournal, diary, status, journalId } = props;
  if (!!journalId) {
    return <JournalPage />;
  } else {
    return (
      <div>
        <nav>
          <Nav />
        </nav>
        <div className="container unfixed">
          <MainBackdrop status={status} />
          <div className="row">
            <OfflineDisplay />
            <DiaryDisplay diary={diary} />
            {myJournals}
          </div>
          <div className="row">
            {" "}
            <CreateNewJournal refreshJournal={refreshJournal} />
          </div>
        </div>
      </div>
    );
  }
}

const JournalComponent = connect(mapStateToJournalComponent)(
  JournalComponentConstruct
);

export default JournalComponent;
