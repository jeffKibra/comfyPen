import Dexie from "dexie";
const db = new Dexie("comfypen");
db.version(1).stores({
  users: "accessToken",
  secret: "key",
  offlineJournal: "entryid, subject, date",
  onlineJournalList: "journalid",
  savedEntries: "entryid, journalid, subject, date",
  unsavedEntries: "entryid, journalid"
});
export default db;
