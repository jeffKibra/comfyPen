import React from "react";
import sanitizeHtml from "sanitize-html";
import TinymceEditor from "./tinymceEditor";
import { encrypt } from "../component/enctype";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import Form from "../component/form";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { auth } = state.firebase;
  return { auth };
};

function Writer(props) {
  const { entry, subject, auth, newEntry, status, journal } = props;
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
      <Form onFormSubmit={onFormSubmit}>
        <TinymceEditor
          journalId={journal.journalId}
          status={status}
          entry={entry}
          subject={subject}
        />
      </Form>
    </>
  );
}

Writer.propTypes = {
  entry: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  newEntry: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Writer);
