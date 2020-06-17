import $ from "jquery";
import { functions } from "../component/fire";

function loginAsync(loginData) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(loading(true));
    const firebase = getFirebase();
    const { email, password } = loginData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //setState({ status: false });
        console.log(user);
        dispatch(finish("login successful!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(this);
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        let err;
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          err = "Invalid username or password!";
        } else {
          err = "Network error!";
        }
        dispatch(finish(err));
        $("#snackBarTrigger").trigger("click");
        console.log(err);
        // ...
      });
  };
}

function logoutAsync() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
}

function signupAsync(signupData) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(loading(true));
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then(({ user }) => {
        const msg = "Account successfully created. Login to proceed!";
        dispatch(finish(msg));
        $("#snackBarTrigger").trigger("click");
        return firestore.collection("users").doc(user.uid).set({
          firstName: signupData.firstName,
          lastName: signupData.lastName,
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });

        const msg = "Network error! Please try again!";
        dispatch(finish(msg));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

function checkEmailAsync(emailData) {
  return (dispatch, getState) => {
    dispatch(loading(true));
    const email = emailData.email;

    const checkEmail = functions.httpsCallable("checkEmail");
    checkEmail(emailData)
      .then((res) => {
        let msg;
        if (res.value === true) {
          msg = "This email is already registered";
        } else if (res.value === false) {
          msg = "Email Available";

          dispatch(next());
        }
        console.log(res);
        dispatch(emailChecked(msg, email));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        const msg = "Please ensure you have an internet connection!";
        dispatch(emailChecked(msg, email));
        $("#snackBarTrigger").trigger("click");
        console.log({ err });
      });
  };
}

function finish(msg) {
  return { type: "FINISH_LOADING", loading: false, msg };
}

function loading(status) {
  return { type: "LOADING", loading: status };
}

function next() {
  return { type: "NEXT" };
}

function prev() {
  return { type: "PREV" };
}

function emailChecked(msg, email) {
  return { type: "CHECK_EMAIL", msg, email };
}

export { loginAsync, logoutAsync, signupAsync, checkEmailAsync, next, prev };
