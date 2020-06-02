import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrU1Qww3cQ2AjOmhh3KE4QjHBhDqXlVcc",
  authDomain: "comfy-278412.firebaseapp.com",
  databaseURL: "https://comfy-278412.firebaseio.com",
  projectId: "comfy-278412",
  storageBucket: "comfy-278412.appspot.com",
  messagingSenderId: "1052451709336",
  appId: "1:1052451709336:web:aa0946bf2b75598ef48bed",
  measurementId: "G-K30Z63CKT6",
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;
