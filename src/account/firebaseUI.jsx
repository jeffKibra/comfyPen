import React from "react";
import firebase from "../component/fire";
import { StyledFirebaseAuth } from "react-firebaseui";

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

export default function FirebaseUi(props) {
  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}
