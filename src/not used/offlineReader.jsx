import React, { useEffect } from "react";
import OfflineList from "./offlineList";
import { connect } from "react-redux";
import WriteBtn from "../journalStrings/writeBtn";
import PagesNav from "../navs/pagesNav";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import db from "../component/dbaccess";
import { setActiveJournal, unsavedEntries } from "../component/redux";

const mapStateToOfflineReader = (state) => {
  return state;
};

const mapDispatchToOfflineReader = (dispatch) => ({
  setActiveJournal: (data) => dispatch(setActiveJournal(data)),
  unsavedEntries: (data) => dispatch(unsavedEntries(data)),
});

function OfflineReaderConstruct(props) {
  const { activeJournal } = props;
  const history = useHistory();

  useEffect(() => {
    const journalIdState = !!props.activeJournal.journalId;
    if (!journalIdState) {
      db.activeJournal.toArray().then((val) => {
        if (val.length === 0) return history.push("/");
        props.setActiveJournal(val[0]);
        const journalId = val[0].journalId;
        db.unsavedEntries
          .where("journalId")
          .equals(journalId)
          .toArray()
          .then((val) => {
            props.unsavedEntries(val);
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
          <span
            onClick={() => {
              $("#saveUnsavedEntries").trigger("click");
            }}
          >
            save Selected
          </span>
          <Link to="/onlineList" style={{ color: "#000" }}>
            savedEntries
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
        <OfflineList journal={activeJournal.unsavedEntries} />
      </div>
      <WriteBtn />
    </>
  );
}

const OfflineReader = connect(
  mapStateToOfflineReader,
  mapDispatchToOfflineReader
)(OfflineReaderConstruct);

export default OfflineReader;
