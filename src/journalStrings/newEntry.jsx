import React, { Component } from "react";
import { connect } from "react-redux";
import sanitizeHtml from "sanitize-html";
import { uuid } from "uuidv4";
import Writer from "./writer";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import Sync from "../component/sync";
import SnackBar from "../component/snackBar";
import $ from "jquery";
import PagesNav from "../navs/pagesNav";
import { Link, withRouter } from "react-router-dom";
import { setMsg, setActiveJournal } from "../component/redux";

const mapStateToWriter = (state) => {
  return state;
};

const mapDispatchToWriter = (dispatch) => ({
  setMsg: (msg) => dispatch(setMsg(msg)),
  setActiveJournal: (data) => dispatch(setActiveJournal(data)),
});

class WriterConstruct extends Component {
  state = {
    status: false,
    msg: "",
  };

  componentDidMount() {
    const journalIdState = !!this.props.activeJournal.journalId;
    if (!journalIdState) {
      db.activeJournal.toArray().then((val) => {
        if (val.length === 0) return this.props.history.push("/");
        this.props.setActiveJournal(val[0]);
      });
    }
  }

  onNewEntry = (data) => {
    this.setState({ status: true });
    let entryId = uuid();
    const entryData = {
      ...data,
      subject: sanitizeHtml(data.subject),
      entry: sanitizeHtml(data.entry),
      journalId: this.props.activeJournal.journalId,
      entryId,
      createdAt: new Date().toISOString(),
      submit: "newEntry",
    };

    Fetcher(entryData, "POST")
      .then((res) => {
        //console.log(res);
        if (res.value === false) {
          throw new Error("false values");
        } else {
          this.setState({ status: false });
          this.props.setMsg({ msg: "data saved" });
          $("#snackBarTrigger").trigger("click");
          $("#fetchEntriesList").trigger("click");
        }
      })
      .catch((err) => {
        this.setState({ status: false });
        this.props.setMsg({ msg: "data saved offline" });
        $("#snackBarTrigger").trigger("click");
        db.unsavedEntries.add(entryData).then(() => {
          $("#fetchEntriesList").trigger("click");
        });
        Sync(entryData);
        //console.log(err);
      });
  };

  render() {
    const { status } = this.state;
    return (
      <>
        <nav>
          <PagesNav>
            <Link to="/onlineList">cancel</Link>
          </PagesNav>
        </nav>
        <div className="unfixed">
          {!!this.props.activeJournal.journalId === true ? (
            <Writer
              subject=""
              entry=""
              newEntry={this.onNewEntry}
              status={status}
            />
          ) : (
            <div className="container">
              <div className="card col-sm-6 col-md-4 mx-auto my-3 bg-info">
                <div className="card-body">
                  <p className="card-text">
                    Please head over to the home page to select a journal to
                    view
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <SnackBar />
      </>
    );
  }
}

const NewEntry = connect(
  mapStateToWriter,
  mapDispatchToWriter
)(WriterConstruct);

export default withRouter(NewEntry);
