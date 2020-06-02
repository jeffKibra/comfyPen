function journalList(data) {
  return { type: "JOURNAL_LIST", data };
}

function entries(data) {
  return { type: "ENTRIES", data };
}

function unsavedEntries(data) {
  return { type: "UNSAVED_ENTRIES", data };
}

function openJournal(id) {
  return { type: "OPEN_JOURNAL", journalId: id };
}

function closeJournal() {
  return { type: "CLOSE_JOURNAL" };
}

function onEdit(data) {
  return {
    type: "ON_EDIT",
    readerData: {},
    editorData: data,
    edit: true,
    read: false,
    write: false
  };
}

function onRead(data) {
  return {
    type: "ON_READ",
    readerData: data,
    editorData: {},
    edit: false,
    read: true,
    write: false
  };
}

function onWrite() {
  return {
    type: "ON_WRITE",
    readerData: {},
    editorData: {},
    edit: false,
    read: false,
    write: true
  };
}

function onView() {
  return {
    type: "ON_VIEW",
    readerData: {},
    editorData: {},
    edit: false,
    read: false,
    write: false
  };
}

function activeJournal(data) {
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

export {
  unsavedEntries,
  journalList,
  activeJournal,
  entries,
  offlineEntry,
  setKey,
  isLogged,
  checkKey,
  openJournal,
  closeJournal,
  onRead,
  onEdit,
  onWrite,
  onView
};
