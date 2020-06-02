import React from "react";
import { Link } from "react-router-dom";

function OfflineDisplay() {
  return (
    <div
      style={{ height: 300 }}
      className="container mx-auto my-2 col-sm-6 col-md-4 col-lg-3"
    >
      <div
        style={{ height: "100%" }}
        className="card col-12 bg-info text-warning"
      >
        <div className="card-body ">
          <h4>Offline Journal</h4>
          <p>All entries are saved locally!</p>
        </div>
        <div className=" mx-auto my-2">
          <Link to="/offline" className="btn btn-outline-warning">
            {" "}
            Open {"  "}
            <i className="fas fa-folder-open"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OfflineDisplay;
