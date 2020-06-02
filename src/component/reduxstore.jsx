import { createStore } from "redux";

const reducer = (state = {}, action) => {
  //console.log(state);
  if (action.type === "JOURNAL_LIST") {
    const newJournal = action.data;
    return { ...state, journals: newJournal };
  } else if (action.type === "ENTRIES") {
    const newJournal = action.data;
    return {
      ...state,
      onlineJournal: { ...state.onlineJournal, savedEntries: newJournal }
    };
  } else if (action.type === "UNSAVED_ENTRIES") {
    //console.log(action);
    const newJournal = action.data;
    return {
      ...state,
      onlineJournal: { ...state.onlineJournal, unsavedEntries: newJournal }
    };
  } else if (action.type === "ACTIVE_JOURNAL") {
    const activeJournal = action.data;
    return {
      ...state,
      onlineJournal: { ...activeJournal, savedEntries: [], unsavedEntries: [] }
    };
  } else if (action.type === "SET_KEY") {
    const securityKey = action.data.pin;
    return { ...state, securityKey };
  } else if (action.type === "OPEN_JOURNAL") {
    const journalId = action.journalId;
    return { ...state, journalId };
  } else if (action.type === "ON_READ") {
    const { readerData, editorData, edit, read, write } = action;

    return { ...state, readerData, editorData, edit, read, write };
  } else if (action.type === "ON_WRITE") {
    const { readerData, editorData, edit, read, write } = action;

    return { ...state, readerData, editorData, edit, read, write };
  } else if (action.type === "ON_EDIT") {
    const { readerData, editorData, edit, read, write } = action;

    return { ...state, readerData, editorData, edit, read, write };
  } else if (action.type === "ON_VIEW") {
    const { readerData, editorData, edit, read, write } = action;

    return { ...state, readerData, editorData, edit, read, write };
  } else if (action.type === "CLOSE_JOURNAL") {
    const journalId = "";
    return { ...state, journalId };
  } else if (action.type === "LOGGED_IN") {
    const logged = action.data.logged;
    return { ...state, logged };
  } else if (action.type === "CHECK_KEY") {
    const storageKey = action.data.storageKey;
    return { ...state, storageKey };
  } else if (action.type === "OFFLINE_ENTRY") {
    //
    const newJournal = action.data;
    return {
      ...state,
      offlineJournal: newJournal
    };
  } else {
    return state;
  }
};

const initialState = {
  edit: false,
  read: false,
  write: false,
  editorData: {},
  readerData: {},
  securityKey: "",
  logged: false,
  storageKey: false,
  journals: [],
  journalId: "",
  onlineJournal: {
    savedEntries: [],
    unsavedEntries: []
  },
  offlineJournal: []
};

const store = createStore(reducer, initialState);

export default store;
