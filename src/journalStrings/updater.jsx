import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Writer from "./writer";
import { connect } from "react-redux";
import { updateEntry } from "./firestoreRedux";
import SnackBar from "../component/snackBar";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const entryId = ownProps.match.params.entryId;
  const { entries } = state.firestore.data;
  const entry = entries ? entries[entryId] : {};
  return { entry };
};

const mapDispatchToProps = (dispatch) => ({
  updateEntry: (data) => dispatch(updateEntry(data)),
});

class UpdaterOnline extends Component {
  componentDidMount() {
    if (!this.props.entry.entryId) {
      return this.props.history.goBack();
    }
  }

  onEntry = (data) => {
    const appData = {
      ...this.props.entry,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
    };
    this.onUpdate(appData);
  };

  onUpdate = (data) => {
    this.props.updateEntry(data);
  };

  render() {
    const { subject, entry } = this.props.entry;

    return (
      <>
        <Writer subject={subject} entry={entry} newEntry={this.onEntry} />
        <SnackBar />
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdaterOnline)
);
