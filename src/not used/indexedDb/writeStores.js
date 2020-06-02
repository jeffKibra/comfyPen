import openDb from "./openDb";

export default function writeStores(mystore, details) {
  let db = null;
  const request = openDb();
  request.onsuccess = function(event) {
    db = event.target.result;
    console.log(details);
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
    var usedStore = transaction.objectStore(mystore);

    var usedRequest = usedStore.add(details);
    usedRequest.onsuccess = function(event) {
      localStorage.setItem("user", details.email);
      localStorage.setItem("id", details.id);
    };
    usedRequest.onerror = function(e) {
      var errorMsg = "an error occurred" + e.target.error.name;
      console.log(errorMsg);
    };
  };
}
