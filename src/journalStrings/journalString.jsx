import React from "react";
import NewEntry from "./newEntry";
import ReaderPage from "./readerPage";
import { connect } from "react-redux";

const mapStateToJournalString = state => {
  const { write } = state;
  return { write };
};

function JournalStringConstruct(props) {
  const { fetchList, write } = props;

  if (write) {
    return (
      <div>
        <NewEntry fetchList={fetchList} />
      </div>
    );
  } else {
    return (
      <div>
        <ReaderPage fetchList={fetchList} />
      </div>
    );
  }
}

const JournalString = connect(mapStateToJournalString)(JournalStringConstruct);

export default JournalString;
