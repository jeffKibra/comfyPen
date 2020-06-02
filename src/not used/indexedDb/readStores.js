import openDb from "./openDb";

export default function readStores(mystore, details) {
  let db = null;
  const request = openDb();
  request.onsuccess = function(event) {
    db = event.target.result;
    //select the store for reading
    var transaction = db.transaction([mystore]);
    transaction.oncomplete = function() {
      console.log("all done!");
    };
    transaction.onerror = function() {
      console.error("an error has occurred: " + transaction.error);
    };
    //get the store
    var store = transaction.objectStore(mystore);
    //retrieve data
    var customers = []; //array to hold values
    store.openCursor().onsuccess = function(event) {
      console.log(event);
      var cursor = event.target.result;
      if (cursor) {
        //console.log(cursor.value);
        customers.push(cursor.value);
        cursor.continue();
      } else {
        console.log(customers);
      }
    };
  };
}
