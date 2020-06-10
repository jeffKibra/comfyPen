import { createStore } from "redux";

const reducer = (state = {}, action) => {
  //console.log(state);
  if (action.type === "JOURNAL_LIST") {
    const newJournal = action.data;
    return {
      ...state,
      journals: [state.notes, state.diary, ...newJournal],
    };
  } else if (action.type === "SAVED_ENTRIES") {
    const newJournal = action.data;
    return {
      ...state,
      activeJournal: { ...state.activeJournal, savedEntries: newJournal },
    };
  } else if (action.type === "UNSAVED_ENTRIES") {
    //console.log(action);
    const newJournal = action.data;
    return {
      ...state,
      activeJournal: { ...state.activeJournal, unsavedEntries: newJournal },
    };
  } else if (action.type === "ACTIVE_JOURNAL") {
    const activeJournal = action.data;
    return {
      ...state,
      activeJournal: { ...activeJournal, savedEntries: [], unsavedEntries: [] },
    };
  } else if (action.type === "SET_KEY") {
    let securityKey;
    if (!!action.data.pin) {
      securityKey = true;
    } else {
      securityKey = false;
    }
    return { ...state, securityKey };
  } else if (action.type === "ACTIVE_ENTRY") {
    const { activeEntry } = action;

    return { ...state, activeEntry };
  } else if (action.type === "LOGGED_IN") {
    const logged = action.data.logged;
    return { ...state, logged };
  } else if (action.type === "CHECK_KEY") {
    const storageKey = action.data.storageKey;
    return { ...state, storageKey };
  } else if (action.type === "SET_MSG") {
    const msg = action.data.msg;
    return { ...state, msg };
  } else if (action.type === "OFFLINE_ENTRY") {
    const newJournal = action.data;
    return {
      ...state,
      notes: newJournal,
    };
  } else {
    return state;
  }
};

const initialState = {
  msg: "",
  activeEntry: {},
  securityKey: false,
  logged: false,
  storageKey: false,
  journals: [],
  activeJournal: {
    savedEntries: [],
    unsavedEntries: [],
  },
  notes: {
    journalName: "Notes...",
    journalDescription: "A note writer. All entrises saved locally!",
    savedEntries: [],
    journalId: "Notes",
    unsavedEntries: [],
  },
  diary: {
    journalName: "Diary...",
    journalDescription: "Your Companion everywhere",
    journalId: "Diary",
    entries: [],
    unsavedEntries: [],
  },
};

const store = createStore(reducer, initialState);

export default store;
