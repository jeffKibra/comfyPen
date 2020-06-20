import $ from "jquery";
import { functions } from "../component/fire";
import { setMsg } from "../component/redux";
import db from "../component/dbaccess";

function loginAsync(loginData) {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(loading(true));
    dispatch(setMsg({ msg: "" }));
    const firebase = getFirebase();
    const { email, password } = loginData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        //setState({ status: false });
        //console.log(user);
        dispatch(finish("login successful!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch(function (error) {
        // Handle Errors here.

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

        // ...
      });
  };
}

function logoutAsync() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    db.pin.clear();
    firebase.auth().signOut();
  };
}

function signupAsync(signupData) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(loading(true));
    dispatch(setMsg({ msg: "" }));
    const firebase = getFirebase();
    const firestore = getFirestore();
    let msg;
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(signupData.email, signupData.password)
        .then(({ user }) => {
          //console.log(user);
          msg = "Account successfully created. Proceed...!";
          dispatch(setMsg({ msg }));
          $("#snackBarTrigger").trigger("click");
          return user;
        });
      //console.log(user);

      await firestore.collection("users").doc(user.uid).set({
        id: user.uid,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
      });

      const db = firestore
        .collection("users")
        .doc(user.uid)
        .collection("journals");

      await db.doc("Notes").set({
        journalId: "Notes",
        journalName: "Notes...",
        journalDescription: "Say goodbye to lost notes!",
      });
      await db.doc("Diary").set({
        journalId: "Diary",
        journalName: "Diary...",
        journalDescription:
          "Your companion everywhere with utmost convenience!",
      });
      console.log("journals created!");
      msg = "account created!";
      dispatch(finish(msg));
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log({ errorCode, errorMessage });

      const msg = "Network error! Please try again!";
      dispatch(finish(msg));
      $("#snackBarTrigger").trigger("click");
    }
  };
}

function checkEmailAsync(emailData) {
  return (dispatch, getState) => {
    dispatch(loading(true));
    dispatch(setMsg({ msg: "" }));
    const email = emailData.email;

    const checkEmail = functions.httpsCallable("checkEmail");
    checkEmail(emailData)
      .then((res) => {
        let msg;
        if (res.data.value === true) {
          msg = "This email is already registered";
        }
        //console.log(res);
        dispatch(emailChecked(msg, email));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        let msg;
        if (err.code === "not-found") {
          msg = err.message ? err.message : "Email available";
          dispatch(next());
        } else {
          msg = "Please ensure you have an internet connection!";
        }

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
