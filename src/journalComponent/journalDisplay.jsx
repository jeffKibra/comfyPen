import React from "react";
import * as moment from "moment";
import { setActiveJournal } from "../component/redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../component/dbaccess";

const mapDispatchToJournalDisplay = (dispatch) => ({
  setActiveJournal: (journal) => dispatch(setActiveJournal(journal)),
});

function JournalDisplayConstruct(props) {
  const history = useHistory();
  const journal = props.journal;

  const { journalName, journalDescription, createdAt } = journal;

  const activeJournal = () => {
    props.setActiveJournal(journal);
    db.activeJournal.clear().then(() => {
      db.activeJournal.add(journal);
    });

    history.push("/onlineList");
  };

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <div
      style={{ height: 300 }}
      className="container mx-auto my-2 col-sm-6 col-md-4 col-lg-3"
    >
      <div
        style={{ height: "100%" }}
        className="card mx-auto col-12 bg-info text-warning  "
      >
        <div className="card-body">
          <h4>{journalName}</h4>
          <p>{journalDescription}</p>

          <small>
            {!!date === true || ""}, {"  "} {!!time === true || ""}
          </small>
        </div>
        <div className="btn-group mx-auto my-2">
          <button onClick={activeJournal} className="btn btn-outline-warning">
            {" "}
            Open {"  "} <FontAwesomeIcon icon="folder-open" />
          </button>
          {journalName === "Notes..." || journalName === "Diary..." || (
            <>
              <button
                onClick={props.onEditClick}
                className="btn btn-outline-warning"
              >
                <FontAwesomeIcon icon="edit" />
              </button>
              <button
                onClick={props.onTrashClick}
                className="btn btn-outline-danger"
              >
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const JournalDisplay = connect(
  null,
  mapDispatchToJournalDisplay
)(JournalDisplayConstruct);

export default JournalDisplay;
