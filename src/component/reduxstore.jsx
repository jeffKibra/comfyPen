import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { firebaseReducer, getFirebase } from "react-redux-firebase";
import {
  firestoreReducer,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import thunk from "redux-thunk";
import customReducer from "./customReducer";
import firebase from "./fire";

const initialState = {};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  custom: customReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
);

export default store;
