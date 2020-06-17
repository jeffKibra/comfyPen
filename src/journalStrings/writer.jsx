import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Diary from "./write";
import { validateFormInput } from "../component/validator";
import ReadBtn from "./readBtn";
import { encrypt } from "../component/enctype";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

class Writer extends Component {
  state = {
    status: this.props.status,
    disabled: true,
    error: {
      subjectError: "",
      entryError: "",
    },
    values: { subject: this.props.subject, entry: this.props.entry },
  };

  static getDerivedStateFromProps(props) {
    return {
      status: props.status,
    };
  }

  onSubjectChange = (e) => {
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

  onSubmit = async () => {
    const subjectError = validateFormInput(
      "subject",
      this.state.values.subject
    );
    let entry;
    /*if (this.props.activeJournal.journalId === "Notes") {
      entry = sanitizeHtml(this.state.values.entry);
    } else {
      entry = await encrypt(sanitizeHtml(this.state.values.entry));
    }*/
    entry = sanitizeHtml(this.state.values.entry);

    //entry = await encrypt(sanitizeHtml(this.state.values.entry));

    const myValues = {
      subject: sanitizeHtml(this.state.values.subject),
      entry: entry,
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
    return (
      <>
        <div className="unfixed">
          <Diary
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
          />
        </div>
        <ReadBtn />
      </>
    );
  }
}

export default connect(mapStateToProps)(Writer);
