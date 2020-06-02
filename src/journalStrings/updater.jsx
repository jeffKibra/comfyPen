import React from "react";
import sanitizeHtml from "sanitize-html";
import Writer from "./writer";
import { connect } from "react-redux";

const mapStateToUpdater = state => {
  const { editorData } = state;
  return { editorData };
};

function UpdaterConstruct(props) {
  const { status, editorData } = props;
  const { subject, entry } = editorData;

  const onEntry = data => {
    const appData = {
      ...editorData,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry)
    };
    props.onEntry(appData);
  };

  return (
    <Writer
      subject={subject}
      entry={entry}
      newEntry={onEntry}
      status={status}
    />
  );
}

const Updater = connect(mapStateToUpdater)(UpdaterConstruct);

export default Updater;
