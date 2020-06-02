import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Diary from "./write";
import { validateFormInput } from "../component/validator";
import { onView } from "../component/redux";
import { connect } from "react-redux";
import WriterNav from "../navs/writerNav";

const mapDispatchToWriter = dispatch => ({
  onView: () => dispatch(onView())
});

class WriterConstruct extends Component {
  state = {
    status: this.props.status,
    disabled: true,
    error: {
      subjectError: "",
      entryError: ""
    },
    values: { subject: this.props.subject, entry: this.props.entry }
  };

  static getDerivedStateFromProps(props) {
    return { status: props.status };
  }

  onSubjectChange = e => {
    const { name, value } = e.target;
    const data = validateFormInput(name, value);
    const error = { ...this.state.error, subjectError: data };
    const values = { ...this.state.values, subject: value };
    this.setState({ error, values });
  };

  onEntryChange = (content, editor) => {
    const data = validateFormInput("entry", content);
    if (content === "") {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
    const error = { ...this.state.error, entryError: data };
    const values = { ...this.state.values, entry: content };
    this.setState({ error, values });
  };

  onSubmit = () => {
    const subjectError = validateFormInput(
      "subject",
      this.state.values.subject
    );

    const myValues = {
      subject: sanitizeHtml(this.state.values.subject),
      entry: sanitizeHtml(this.state.values.entry)
    };
    const entryError = validateFormInput("entry", this.state.values.entry);
    if (subjectError === "" && entryError === "") {
      this.props.newEntry(myValues);

      const values = { ...this.state.values, subject: "", entry: "" };
      const error = { ...this.state.error, subjectError: "", entryError: "" };
      this.setState({ values, error });
    } else {
      const error = { ...this.state.error, entryError, subjectError };
      this.setState({ error });
    }
  };

  render() {
    const { disabled, error, values, status } = this.state;
    const { onView, msg } = this.props;
    return (
      <>
        <nav><WriterNav onView={onView} /></nav>
        <div className="unfixed">
        <Diary
          msg={msg}
          status={status}
          disabled={disabled}
          entry={values.entry}
          subject={values.subject}
          entryError={error.entryError}
          subjectError={error.subjectError}
          onSubmit={this.onSubmit}
          onSubjectChange={this.onSubjectChange}
          onEntryChange={this.onEntryChange}
          newEntry={this.onNewEntry}
          onView={onView}
        />
        </div>
      </>
    );
  }
}

const Writer = connect(null, mapDispatchToWriter)(WriterConstruct);

export default Writer;
