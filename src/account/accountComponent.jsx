import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "../component/fire";

const uiConfig = {
  //signInFlow: "popup",
  //signInSuccessUrl: "/account",
  callbacks: {
    signInSuccess: () => {
      return false;
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
  ],
};

export default function AccountComponent(props) {
  const { auth, profile } = props.firebase;
  const { uid, email, displayName } = auth;
  const { firstName, lastName } = profile;

  return (
    <>
      <div className="container-fluid unfixed">
        <div className="row mx-auto  text-center">
          <div
            style={{ fontSize: "10rem" }}
            className="col-12 mx-auto my-0  text-center text-info"
          >
            <FontAwesomeIcon icon="user-circle" />
          </div>
          <div className="col-12 mx-auto my-1 text-center">
            <span>
              {uid ? (
                <>
                  <h3>{displayName || firstName + "  " + lastName} </h3>
                  <h5>{email}</h5>
                  <Link
                    to="/logout"
                    className="btn btn-outline-warning my-5 col-10 col-sm-6 col-md-4"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <p>Please Sign in below to continue</p>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
