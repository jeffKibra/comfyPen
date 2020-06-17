import Dexie from "dexie";
const db = new Dexie("comfypen");
db.version(1).stores({
  pin: "pin",
});
export default db;
