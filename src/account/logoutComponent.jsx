import React from "react";

function LogoutComponent(props) {
  const { onLogout } = props;

  return (
    <>
      <div className="card col-sm-6 col-md-4 mx-auto bg-light ">
        <div className="card-body">
          <>
            <h3 className="card-title">Logout?</h3>
            <p className="card-text">
              Are you sure you want to logout? Please note that all your unsaved
              records will be lost. Ensure you save any important entries to
              your online storage!!
            </p>
            <button onClick={onLogout} className="btn btn-outline-info">
              Logout
            </button>
          </>
        </div>
      </div>
    </>
  );
}

export default LogoutComponent;
