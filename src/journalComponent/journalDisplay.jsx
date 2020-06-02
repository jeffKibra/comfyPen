import React, { useState } from "react";
import { openJournal } from "../component/redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import db from "../component/dbaccess";

const mapDispatchToJournalDisplay = dispatch => ({
  openJournal: id => dispatch(openJournal(id))
});

function JournalDisplayConstruct(props) {
  const {
    journalname,
    journaldescription,
    date,
    time,
    journalid
  } = props.journal;
  const [logged, setLogged] = useState(true);

  const openJournal = () => {
    db.users.toArray().then(val => {
      if (val.length === 0 || val[0].accessToken === "") {
        setLogged(false);
      } else {
        setLogged(true);
        props.openJournal(journalid);
      }
    });
  };

  if (!logged) {
    return <Redirect to="/login" />;
  }

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
          <h4>{journalname}</h4>
          <p>{journaldescription}</p>

          <small>
            {date}, {"  "} {time}
          </small>
        </div>
        <div className="btn-group mx-auto my-2">
          <button onClick={openJournal} className="btn btn-outline-warning">
            {" "}
            Open {"  "} <i className="fas fa-folder-open"></i>
          </button>
          <button
            onClick={props.onEditClick}
            className="btn btn-outline-warning"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={props.onTrashClick}
            className="btn btn-outline-danger"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        {/*<Link to={`/journals/${id}`} className="btn btn-outline-primary">
      Open <i className="fas fa-folder-open"></i>
    </Link> */}
      </div>
    </div>
  );
}

const JournalDisplay = connect(
  null,
  mapDispatchToJournalDisplay
)(JournalDisplayConstruct);

export default JournalDisplay;
