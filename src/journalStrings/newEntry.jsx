import React from "react";
import { connect } from "react-redux";
import sanitizeHtml from "sanitize-html";
import { uuid } from "uuidv4";
import Writer from "./writer";
import SnackBar from "../component/snackBar";
import { withRouter } from "react-router-dom";
import { addEntry } from "./firestoreRedux";
import $ from "jquery";
import { setMsg } from "../component/redux";

const mapStateToProps = (state, ownProps) => {
  const { journalId } = ownProps.match.params;
  const { journals } = state.firestore.data;
  const journal = journals ? journals[journalId] : {};
  return { journal };
};

const mapDispatchToProps = (dispatch) => ({
  addEntry: (data) => dispatch(addEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function NewEntryConstruct(props) {
  const { journal, setMsg } = props;

  const onNewEntry = (data) => {
    let entryId = uuid();
    const entryData = {
      ...data,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalId: journal.journalId,
      entryId,
      createdAt: new Date().toISOString(),
    };
    props.addEntry(entryData);
    setMsg({ msg: "Saved!" });
    $("#snackBarTrigger").trigger("click");
  };

  return (
    <>
      <Writer subject="" entry="" newEntry={onNewEntry} />
      <SnackBar />
    </>
  );
}

const NewEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEntryConstruct);

export default withRouter(NewEntry);
