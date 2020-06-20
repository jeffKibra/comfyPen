import React, { Component } from "react";
import { decrypt } from "../component/enctype";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MainBackdrop from "../component/backdrop";

const mapStateToProps = (state, ownProps) => {
  const entryId = ownProps.match.params.entryId;
  const { email } = state.firebase.auth;
  const { entries } = state.firestore.data;
  const entry = entries ? entries[entryId] : {};
  return { entry, email };
};

export default function Decrypter(WrappedComponent) {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        entry: {},
      };
    }

    componentDidMount() {
      if (!this.props.entry.entryId) {
        return this.props.history.goBack();
      }
      const { email, entry } = this.props;
      const customEntry = entry.customEntry;
      if (!!customEntry) {
        this.decryptEntry(entry, email);
      } else {
        this.setState({ entry });
      }
    }

    decryptEntry = async (entry, email) => {
      const decrypted = await decrypt(entry.entry, email, entry.customEntry);
      this.setState({ entry: { ...entry, entry: decrypted } });
      //return decrypted;
    };

    render() {
      const entryId = this.state.entry.entryId;
      return (
        <>
          {entryId ? (
            <WrappedComponent {...this.props} entry={this.state.entry} />
          ) : (
            <MainBackdrop status={!!entryId} />
          )}
        </>
      );
    }
  }

  const returnEl = connect(mapStateToProps)(HOC);
  return withRouter(returnEl);
}
