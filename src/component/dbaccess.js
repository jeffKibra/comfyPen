import Dexie from "dexie";
const db = new Dexie("comfypen");
db.version(1).stores({
  token: "comfy",
  user: "email",
  pin: "pin",
  notes: "entryId, createdAt",
  diary: "entryId, createdAt",
  customJournalsList: "journalId",
  savedEntries: "entryId, journalId, createdAt",
  unsavedEntries: "entryId, journalId, createdAt",
  activeJournal: "journalId",
  activeEntry: "entryId",
});
export default db;
