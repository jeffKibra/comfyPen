import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";
import Writer from "./writer";
import { connect } from "react-redux";
import Fetcher from "../component/server";
import $ from "jquery";
import { Link } from "react-router-dom";
import PagesNav from "../navs/pagesNav";
import { setMsg } from "../component/redux";

const mapStateToUpdaterOnline = (state) => {
  return state;
};

const mapDispatchToUpdaterOnline = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
});

class UpdaterOnlineConstruct extends Component {
  state = {
    status: false,
  };

  onEntry = (data) => {
    const appData = {
      ...this.props.activeEntry,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalId: this.props.myJournal.journalId,
      submit: "updateEntry",
    };
    this.onUpdate(appData);
  };

  onUpdate = (data) => {
    this.setState({ status: true });
    const entryId = this.props.activeEntry.entryId;

    Fetcher(data, "PUT")
      .then((res) => {
        if (res.value === false) {
          //console.log(res);
          throw new Error("false value");
        } else {
          this.setState({ status: false });
          this.props.setMsg({ msg: "updated" });
          $("#snackBarTrigger").trigger("click");
          $("#fetchEntriesList").trigger("click");
        }
      })
      .catch((err) => {
        //console.log(err);
        this.setState({ status: false });
        this.props.setMsg({ msg: "CANNOT UPDATE AN ENTRY WHILE OFFLINE" });
        $("#snackBarTrigger").trigger("click");
      });
  };

  render() {
    const { status } = this.state;
    const { subject, entry } = this.props.activeEntry;

    return (
      <>
        <nav>
          <PagesNav>
            <Link to="/onlineList">cancel</Link>
          </PagesNav>
        </nav>
        <Writer
          subject={subject}
          entry={entry}
          newEntry={this.onEntry}
          status={status}
        />
      </>
    );
  }
}

const UpdaterOnline = connect(
  mapStateToUpdaterOnline,
  mapDispatchToUpdaterOnline
)(UpdaterOnlineConstruct);

export default UpdaterOnline;
