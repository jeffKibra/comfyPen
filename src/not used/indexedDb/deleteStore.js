import openDb from "./openDb";

export default function deleteValues(mystore, value, indexValue) {
  //takes in values of index to be searched
  let db = null;
  const request = openDb();
  request.onsuccess = function(event) {
    db = event.target.result;

    //select the store for reading
    let transaction = db.transaction([mystore], "readwrite");
    transaction.oncomplete = function() {
      console.log("deletion all done!");
    };
    transaction.onerror = function() {
      console.error(
        "an error has occurred when deleting: " + transaction.error
      );
    };
    //get the store
    let store = transaction.objectStore("subject");
    let index = store.index(indexValue);
    //retrieve data
    let searchValue = IDBKeyRange.only(value);
    //delete from the subject store
    index.openCursor(searchValue).onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
        let deleteRequest = cursor.delete();
        deleteRequest.onsuccess = function() {
          console.log("deletion successful");
        };
        cursor.continue();
      } else {
        console.log("item deleted");
      }
    };

    request.onerror = function() {
      console.error("an error has occurred: ");
    };
  };
}
