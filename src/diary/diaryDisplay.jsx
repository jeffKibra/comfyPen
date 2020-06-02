import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { openJournal } from "../component/redux";
import { connect } from "react-redux";
import db from "../component/dbaccess";

const mapDispatchToDiaryDisplay = dispatch => ({
  openJournal: id => dispatch(openJournal(id))
});

function DiaryDisplayConstruct(props) {
  const diary = props.diary[0];

  const [logged, setLogged] = useState(true);

  const openJournal = () => {
    db.users.toArray().then(value => {
      if (value.length === 0 || value[0].accessToken === "") {
        setLogged(false);
      } else {
        setLogged(true);
        props.openJournal(value[0].id);
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
          <h4>{diary?.journalname || "Diary"}</h4>
          <p>
            {diary?.journaldescription ||
              "Please ensure you set a pin to lock your entrie!"}
          </p>
          {logged === false && <p>Only accessible to Logged in users! </p>}
          <small>
            {diary?.date && <p></p>}, {"  "} {diary?.time && <p></p>}
          </small>
        </div>

        <button
          onClick={openJournal}
          className="btn my-2 btn-outline-warning mx-auto"
        >
          {" "}
          Open <i className="fas fa-folder-open"></i>
        </button>

        {/*<Link to={`/journals/${id}`} className="btn btn-outline-primary">
      Open <i className="fas fa-folder-open"></i>
    </Link> */}
      </div>
    </div>
  );
}

const DiaryDisplay = connect(
  null,
  mapDispatchToDiaryDisplay
)(DiaryDisplayConstruct);

export default DiaryDisplay;
