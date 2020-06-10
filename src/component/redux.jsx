function journalList(data) {
  return { type: "JOURNAL_LIST", data };
}

function savedEntries(data) {
  return { type: "SAVED_ENTRIES", data };
}

function unsavedEntries(data) {
  return { type: "UNSAVED_ENTRIES", data };
}

function setActiveEntry(data) {
  return {
    type: "ACTIVE_ENTRY",
    activeEntry: data,
  };
}

function setActiveJournal(data) {
  return { type: "ACTIVE_JOURNAL", data };
}

function offlineEntry(data) {
  return { type: "OFFLINE_ENTRY", data };
}

function setKey(data) {
  return { type: "SET_KEY", data };
}

function isLogged(data) {
  return { type: "LOGGED_IN", data };
}

function checkKey(data) {
  return { type: "CHECK_KEY", data };
}

function setMsg(data) {
  return { type: "SET_MSG", data };
}

export {
  unsavedEntries,
  journalList,
  setActiveJournal,
  savedEntries,
  offlineEntry,
  setKey,
  isLogged,
  checkKey,
  setActiveEntry,
  setMsg,
};
