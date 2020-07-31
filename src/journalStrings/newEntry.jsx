import React from "react";
import { connect } from "react-redux";
import sanitizeHtml from "sanitize-html";
import { uuid } from "uuidv4";
import Writer from "./writer";
import { withRouter } from "react-router-dom";
import { addEntry } from "./firestoreRedux";
import $ from "jquery";
import { setMsg } from "../component/redux";
import PropTypes from "prop-types";
import { compose } from "recompose";
import ReadBtn from "./readBtn";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const userId = state.firebase.auth.uid;
  const { journalId } = ownProps.match.params;
  const { journals } = state.firestore.data;
  const journal = journals ? journals[journalId] : {};
  return { journal, userId };
};

const mapDispatchToProps = (dispatch) => ({
  addEntry: (data) => dispatch(addEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

function NewEntry(props) {
  const { journal, setMsg, userId } = props;
  const history = useHistory();

  const onNewEntry = (data) => {
    const { entry, customEntry } = data.entry;
    let entryId = uuid();
    const entryData = {
      userId,
      customEntry,
      subject: sanitizeHtml(data.subject),
      entry,
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
      <Writer journal={journal} subject="" entry="" newEntry={onNewEntry} />
      <ReadBtn read={() => history.goBack()} />
    </>
  );
}

NewEntry.propTypes = {
  setMsg: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NewEntry);
