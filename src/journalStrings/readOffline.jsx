import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import db from "../component/dbaccess";
import PagesNav from "../navs/pagesNav";
import ReadFinal from "./readFinal";
import { unsavedEntries, setMsg, setActiveEntry } from "../component/redux";
import { withRouter } from "react-router-dom";

const mapStateToReadOffline = (state) => {
  return state;
};

const mapDispatchToReadOffline = (dispatch) => ({
  unsavedEntries: (data) => dispatch(unsavedEntries(data)),
  setMsg: (msg) => dispatch(setMsg(msg)),
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

class ReadOfflineConstruct extends Component {
  state = {
    status: false,
  };

  onEditClick = () => {
    this.props.history.push("/edit");
  };

  onTrashClick = (e) => {
    this.onDelete(this.props.activeEntry);
  };

  onDelete = (data) => {
    this.setState({ status: true });
    db.unsavedEntries
      .delete(data.entryId)
      .then(() => {
        db.activeEntry.clear();
        this.props.setActiveEntry({});
        this.setState({ status: false });
        this.props.setMsg({ msg: "Deleted" });
        $("#snackBarTrigger").trigger("click");
        db.unsavedEntries
          .where("journalId")
          .equals(this.props.activeJournal.journalId)
          .toArray()
          .then((val) => {
            this.props.unsavedEntries(val);
          });
      })
      .catch((err) => {
        this.setState({ status: false });
        this.props.setMsg({ msg: "Delete failed!" });
        $("#snackBarTrigger").trigger("click");
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        <nav>
          <PagesNav>
            <span onClick={this.onEditClick}>Edit</span>
            <span onClick={this.onTrashClick}>Delete</span>
          </PagesNav>
        </nav>

        <div className="unfixed">
          <ReadFinal />
        </div>
      </div>
    );
  }
}

const ReadOffline = connect(
  mapStateToReadOffline,
  mapDispatchToReadOffline
)(ReadOfflineConstruct);

export default withRouter(ReadOffline);
