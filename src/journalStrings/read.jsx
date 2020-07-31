import React, { Component } from "react";
import { connect } from "react-redux";
import ReadFinal from "./readFinal";
import { updateEntry, deleteEntry } from "./firestoreRedux";
import { setMsg } from "../component/redux";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import Decrypter from "./decrypter";
import { compose } from "recompose";
import PropTypes from "prop-types";
import Writer from "./writer";
import ReadBtn from "./readBtn";
import { firestoreConnect } from "react-redux-firebase";

const mapStateToProps = (state, ownProps) => {
  //console.log({ state, ownProps });
  const { auth } = state.firebase;
  const path = ownProps.match.params.entryId;
  const [journalId, entryId] = path.split(":");
  const { email } = state.firebase.auth;
  const { entries } = state.firestore.data;
  const entry = entries ? entries[entryId] : {};
  return { entry, email, entryId, journalId, auth, state };
};

const mapDispatchToProps = (dispatch) => ({
  updateEntry: (data) => dispatch(updateEntry(data)),
  deleteEntry: (data) => dispatch(deleteEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class ReadOnline extends Component {
  state = {
    anchorEl: null,
    read: true,
  };

  //updater
  onUpdate = (data) => {
    const { entry, customEntry } = data.entry;

    const appData = {
      ...this.props.entry,
      subject: data.subject,
      entry,
      customEntry,
    };
    this.props.updateEntry(appData);
    this.props.setMsg({ msg: "entry updated" });
    $("#snackBarTrigger").trigger("click");
    //this.props.history.push("/onlineList/" + appData.journalId);
    this.props.history.goBack();
    //this.read();
  };

  //reader
  onDelete = () => {
    this.handleClose();
    this.props.deleteEntry(this.props.entry);
    this.props.setMsg({ msg: "Deleted!" });
    $("#snackBarTrigger").trigger("click");
    this.props.history.goBack();
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  read = () => {
    this.handleClose();
    this.setState((prevState) => {
      return { read: !prevState.read };
    });
  };

  render() {
    const { subject, entry, journalId } = this.props.entry;
    const journal = { journalId };
    const { read } = this.state;
    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        {read ? (
          <ReadFinal
            edit={this.read}
            open={open}
            anchorEl={this.state.anchorEl}
            handleMenu={this.handleMenu}
            handleClose={this.handleClose}
            onTrashClick={this.onDelete}
            entry={this.props.entry}
          />
        ) : (
          <>
            <Writer
              subject={subject}
              journal={journal}
              entry={entry}
              newEntry={this.onUpdate}
            />
            <ReadBtn read={this.read} />
          </>
        )}
      </div>
    );
  }
}

ReadOnline.propTypes = {
  entry: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    //console.log(props);
    const { journalId, auth, entryId } = props;
    const entryListener = {
      collection: "users",
      doc: auth?.uid,
      subcollections: [
        {
          collection: "journals",
          doc: journalId,
          subcollections: [
            {
              collection: "entries",
              doc: entryId,
              //orderBy: ["createdAt", "desc"],
              //limit: 10,
            },
          ],
          storeAs: "entry",
        },
      ],
      storeAs: "entry",
    };
    return entryId ? [entryListener] : [];
  }),
  Decrypter
)(ReadOnline);
