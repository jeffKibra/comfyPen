import React, { Component } from "react";
import { connect } from "react-redux";
import ReadFinal from "./readFinal";
import { deleteEntry } from "./firestoreRedux";
import { setMsg } from "../component/redux";
import $ from "jquery";
import Decrypter from "./decrypter";
import { compose } from "recompose";

const mapDispatchToProps = (dispatch) => ({
  deleteEntry: (data) => dispatch(deleteEntry(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class ReadOnline extends Component {
  state = {
    anchorEl: null,
  };

  onDelete = () => {
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
      </div>
    );
  }
}

export default compose(
  Decrypter,
  connect(null, mapDispatchToProps)
)(ReadOnline);
