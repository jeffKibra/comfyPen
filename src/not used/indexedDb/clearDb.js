import openDb from "./openDb";

export default function ondbClear(mystore) {
  //function clear data in stores to avoid duplication
  let db = null;
  const request = openDb();
  request.onsuccess = function(event) {
    db = event.target.result;
    //select stores for read and write
    var transaction = db.transaction([mystore], "readwrite");
    transaction.oncomplete = function() {
      console.log("all done!");
    };
    transaction.onerror = function() {
      console.error(
        "an error has occurred when opening the store: " + transaction.error
      );
    };

    //get the store
    var store = transaction.objectStore(mystore);
    //delete added data before writing
    var clearStore = store.clear();

    clearStore.onsuccess = function(event) {
      console.log("delete data in store success");
    };
    clearStore.onerror = function(event) {
      console.log("delete data in store failed");
    };
  };

  request.onerror = function() {
    console.error("an error has occurred: ");
  };
}
