import React, { Component } from "react";
import { connect } from "react-redux";
import ReadFinal from "./readFinal";
import { withRouter } from "react-router-dom";
import { deleteEntry } from "./firestoreRedux";
import SnackBar from "../component/snackBar";
import { setMsg } from "../component/redux";
import $ from "jquery";

const mapStateToProps = (state, ownProps) => {
  const entryId = ownProps.match.params.entryId;
  const { entries } = state.firestore.data;
  const entry = entries ? entries[entryId] : {};
  return { entry };
};

const mapDispatchToProps = (dispatch) => ({
  deleteEntry: (data) => dispatch(deleteEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class ReadOnline extends Component {
  state = {
    anchorEl: null,
  };

  componentDidMount() {
    if (!this.props.entry.entryId) {
      return this.props.history.goBack();
    }
  }

  onDelete = () => {
    this.props.deleteEntry(this.props.entry);
    this.props.setMsg({ msg: "Deleted!" });
    $("#snackBarTrigger").trigger("click");
    setTimeout(() => {
      this.props.history.goBack();
      console.log("blasted");
    }, 2000);
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <ReadFinal
          open={open}
          anchorEl={this.state.anchorEl}
          handleMenu={this.handleMenu}
          handleClose={this.handleClose}
          onTrashClick={this.onDelete}
          entry={this.props.entry}
        />
        <SnackBar />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReadOnline)
);
