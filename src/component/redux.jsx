function journalList(data) {
  return { type: "JOURNAL_LIST", data };
}

function setEntriesList(data) {
  return { type: "ENTRIES_LIST", data };
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
  journalList,
  setActiveJournal,
  setEntriesList,
  setKey,
  isLogged,
  checkKey,
  setActiveEntry,
  setMsg,
};
