import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAsync } from "./authRedux";

const mapStateToLogout = (state) => state;

const mapDispatchToLogout = (dispatch) => ({
  logoutAsync: () => dispatch(logoutAsync()),
});

function LogoutConstruct(props) {
  const history = useHistory();

  useEffect(() => {
    const { uid } = props.firebase.auth;
    if (!uid) history.push("/account");
  }, [props.firebase.auth, history]);

  const onLogout = () => {
    props.logoutAsync();
  };

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

const Logout = connect(mapStateToLogout, mapDispatchToLogout)(LogoutConstruct);

export default Logout;
