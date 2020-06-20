import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Diary from "./write";
import { validateFormInput } from "../component/validator";
import ReadBtn from "./readBtn";
import { encrypt } from "../component/enctype";
import { connect } from "react-redux";
import { uuid } from "uuidv4";

const mapStateToProps = (state) => state;

class Writer extends Component {
  state = {
    email: "",
    status: this.props.status,
    disabled: true,
    error: {
      subjectError: "",
      entryError: "",
    },
    values: { subject: this.props.subject, entry: this.props.entry },
  };

  componentDidMount() {
    const email = this.props.firebase.auth.email;
    this.setState({ email });
  }

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
    let customEntry = uuid();
    const email = this.state.email;
    const { journalId } = this.props.journal;
    let { entry, subject } = this.state.values;
    const subjectError = validateFormInput("subject", subject);

    if (journalId === "Notes") {
      entry = sanitizeHtml(entry);
      entry = { entry, customEntry: "" };
      // customEntry = "";
    } else {
      entry = sanitizeHtml(entry);
      entry = await encrypt(entry, email, customEntry);
    }

    const myValues = {
      subject: sanitizeHtml(subject),
      entry: entry,
    };

    const entryError = validateFormInput("entry", entry);
    if (subjectError === "" && entryError === "") {
      const values = { ...this.state.values, subject: "", entry: "" };
      const error = { ...this.state.error, subjectError: "", entryError: "" };
      this.setState({ values, error });

      this.props.newEntry(myValues);
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
