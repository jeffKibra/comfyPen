import React, { useEffect } from "react";
import { connect } from "react-redux";
import OnlineList from "./onlineList";
import WriteBtn from "./writeBtn";
import PagesNav from "../navs/pagesNav";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { setActiveJournal, savedEntries } from "../component/redux";
import db from "../component/dbaccess";

const mapStateToOnlineReader = (state) => {
  return state;
};

const mapDispatchToOnlineReader = (dispatch) => ({
  setActiveJournal: (data) => dispatch(setActiveJournal(data)),
  savedEntries: (data) => dispatch(savedEntries(data)),
});

function OnlineReaderConstruct(props) {
  const { activeJournal } = props;
  const history = useHistory();

  useEffect(() => {
    const journalIdState = !!props.activeJournal.journalId;
    if (!journalIdState) {
      db.activeJournal.toArray().then((val) => {
        if (val.length === 0) return history.push("/");
        props.setActiveJournal(val[0]);
        const journalId = val[0].journalId;
        db.savedEntries
          .where("journalId")
          .equals(journalId)
          .toArray()
          .then((val) => {
            props.savedEntries(val);
            console.log(val);
          });
      });
    }
    $("#fetchEntriesList").trigger("click");
  }, []);

  return (
    <>
      <nav>
        <PagesNav header={activeJournal.journalName}>
          <Link to="/offlineList" style={{ color: "#000" }}>
            LocalEntries
          </Link>
          <Link to="/write" style={{ color: "#000" }}>
            write
          </Link>
          <span
            onClick={() => {
              $("#fetchEntriesList").trigger("click");
            }}
          >
            refresh
          </span>
        </PagesNav>
      </nav>
      <div className="unfixed">
        {!!activeJournal.journalId === true ? (
          <OnlineList journal={activeJournal.savedEntries} />
        ) : (
          <div className="container">
            <div className="card col-sm-6 col-md-4 mx-auto my-3 bg-info">
              <div className="card-body">
                <p className="card-text">
                  Please head over to the home page to select a journal to view
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <WriteBtn />
    </>
  );
}

const OnlineReader = connect(
  mapStateToOnlineReader,
  mapDispatchToOnlineReader
)(OnlineReaderConstruct);

export default OnlineReader;
