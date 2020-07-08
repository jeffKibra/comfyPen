// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

/*var firebaseConfig = {
  apiKey: "AIzaSyBrU1Qww3cQ2AjOmhh3KE4QjHBhDqXlVcc",
  authDomain: "comfy-278412.firebaseapp.com",
  databaseURL: "https://comfy-278412.firebaseio.com",
  projectId: "comfy-278412",
  storageBucket: "comfy-278412.appspot.com",
  messagingSenderId: "1052451709336",
  appId: "1:1052451709336:web:aa0946bf2b75598ef48bed",
  measurementId: "G-K30Z63CKT6",
};*/
const firebaseConfig = {
  apiKey: "AIzaSyAHg0P5UCPJQRD4ScEoB1Yw1gS_f4T4xgw",
  authDomain: "comfy-pen.firebaseapp.com",
  databaseURL: "https://comfy-pen.firebaseio.com",
  projectId: "comfy-pen",
  storageBucket: "comfy-pen.appspot.com",
  messagingSenderId: "679837636378",
  appId: "1:679837636378:web:57ced048a1a0a3c508bea3",
  measurementId: "G-RF7QTHTDX1",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//firebase.firestore();

firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log("offline data enabled");
  })
  .catch(function (err) {
    console.log({ errorCode: err.code, errorMessage: err.message });
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      alert(
        "To store data for offline availability... please open one tab at a time"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("your browser does not support offline data caching");
    }
  });

const firestore = firebase.firestore();
const functions = firebase.functions();
/*functions.useFunctionsEmulator(
  "http://localhost:5000/comfy-pen/us-central1/checkEmail"
);*/

export { functions, firestore };

// Subsequent queries will use persistence, if it was enabled successfully

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
export default firebase;
