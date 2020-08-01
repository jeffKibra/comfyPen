import React from "react";
import sanitizeHtml from "sanitize-html";
import TinymceEditor from "./tinymceEditor";
import { encrypt } from "../component/enctype";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const { auth } = state.firebase;
  const { journalId } = ownProps.match.params;
  return { auth, journalId };
};

function Writer(props) {
  //console.log(props);
  const { entry, subject, auth, newEntry, status, journalId } = props;
  const onFormSubmit = async (content) => {
    //console.log(content);
    let customEntry = uuid();
    const email = auth.email;
    let { entry, subject } = content;

    entry = sanitizeHtml(entry);
    entry = await encrypt(entry, email, customEntry);

    const myValues = {
      subject: sanitizeHtml(subject),
      entry: entry,
    };
    newEntry(myValues);
  };

  return (
    <>
      <TinymceEditor
        journalId={journalId}
        status={status}
        entry={entry}
        subject={subject}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}

Writer.propTypes = {
  entry: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  newEntry: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default compose(withRouter, connect(mapStateToProps))(Writer);
