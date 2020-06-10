import React, { Component } from "react";
import { connect } from "react-redux";
import Fetcher from "../component/server";
import $ from "jquery";
import db from "../component/dbaccess";
import PagesNav from "../navs/pagesNav";
import ReadFinal from "./readFinal";
import { withRouter } from "react-router-dom";
import { setMsg } from "../component/redux";

const mapStateToReadOnline = (state) => {
  return state;
};

const mapDispatchToReadOnline = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class ReadOnlineConstruct extends Component {
  state = {
    status: false,
    msg: "",
  };

  onEditClick = () => {
    this.props.history.push("/read");
  };

  onTrashClick = (e) => {
    this.onDelete(this.props.activeEntry);
  };

  onDelete = (data) => {
    this.setState({ status: true });
    const appData = {
      ...data,
      journalId: this.props.activeJournal.journalId,
      submit: "deleteEntry",
    };

    Fetcher(appData, "DELETE")
      .then((res) => {
        if (!res.value) {
          //console.log(res);
          throw new Error("false value");
        } else {
          db.savedEntries.where("entryId").equals(data.entryId).delete();
          this.setState({ status: false });
          this.props.setMsg({ msg: "Deleted" });
          $("#snackBarTrigger").trigger("click");
          $("#fetchEntriesList").trigger("click");
        }
      })
      .catch((err) => {
        this.setState({ status: false });
        this.props.setMsg({ msg: "Delete failed" });
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

const ReadOnline = connect(
  mapStateToReadOnline,
  mapDispatchToReadOnline
)(ReadOnlineConstruct);

export default withRouter(ReadOnline);
