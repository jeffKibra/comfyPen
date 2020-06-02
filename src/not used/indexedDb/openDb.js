export default function openDb() {
  var db = null,
    request = window.indexedDB.open("fcrDiary", 3);

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    //console.log(event);
    if (event.oldVersion < 1) {
      //didnt exist
      /*var subjectStore = db.createObjectStore("subject", {
            autoIncrement: true
          }); //offline subject store
          var entriesStore = db.createObjectStore("entries", {
            autoIncrement: true
          }); //offline entries store*/
      db.createObjectStore("onlineEntries", { autoIncrement: true }); //online entries store
      db.createObjectStore("user", { keyPath: "id" });
      db.createObjectStore("pass", { keyPath: "id" }); //permanent user details for logging in and out.
    }
  };
  return request;
}

//if it exists and version less than 2
/*if (event.oldVersion < 2) {
          subjectStore = request.transaction.objectStore("subject");
          entriesStore = request.transaction.objectStore("entries");
          var onlinesubject = request.transaction.objectStore("onlineSubject");
          var onlineentry = request.transaction.objectStore("onlineEntries");
          subjectStore.createIndex("dated", "dated", { unique: false });
          subjectStore.createIndex("timed", "timed", { unique: true });
          subjectStore.createIndex("subject", "subject", { unique: false });
    
          entriesStore.createIndex("subject", "subject", { unique: false });
          entriesStore.createIndex("dated", "dated", { unique: false });
          entriesStore.createIndex("timed", "timed", { unique: true });
    
          onlinesubject.createIndex("dated", "dated", { unique: false });
          onlinesubject.createIndex("subject", "subject", { unique: false });
    
          onlineentry.createIndex("dated", "dated", { unique: false });
          onlineentry.createIndex("subject", "subject", { unique: false });
          onlineentry.createIndex("timed", "timed", { unique: true });
    
          //entriesStore.createIndex("by_email", "email");
          //store2.createIndex("by_name", "name");
          //store2.createIndex("by_email", "email");
        }*/
