import React from "react";
import { Link } from "react-router-dom";
import { offlineEntry } from "./redux";
import { connect } from "react-redux";

const mapDispatchToOfflineJournal = dispatch => ({
  submit: data => dispatch(offlineEntry(data))
});

const OfflineJournal = connect(
  null,
  mapDispatchToOfflineJournal
)(OfflineJournalConstruct);

function OfflineJournalConstruct(props) {
  return (
    <div className="card col-sm-7 mx-auto my-3">
      <div className="card-body">
        <h3>Offline Journal</h3>
        <h5>You do not need an account to use this journal.</h5>
        <p>
          All entries in this journal are all saved locally in your device. This
          means that your data will be lost incase the device is lost or you
          clear the memory of your device. This however limits you to only
          myModal offline journal per device.
        </p>
        <Link to="/offline" className="btn btn-outline-primary">
          open <i className="fas fa-folder-open"></i>
        </Link>
      </div>
    </div>
  );
}
const OnlineJournal = () => {
  return (
    <div className="card col-sm-7 mx-auto my-3">
      <div className="card-body">
        <h3>Online Journals</h3>
        <h5>You must have an account to access this journals.</h5>
        <p>
          The entries in these journals are available both online and offline.
          You have access to unlimited journals that you create at the touch of
          a button.{" "}
        </p>
        <Link to="/myJournals" className="btn btn-outline-primary">
          open <i className="fas fa-folder-open"></i>
        </Link>
      </div>
    </div>
  );
};

const Entry = () => {
  return (
    <div>
      <OfflineJournal />
      <OnlineJournal />
    </div>
  );
};

export default Entry;
