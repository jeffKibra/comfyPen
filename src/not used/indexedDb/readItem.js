import openDb from "./openDb";

function readItem() {
  var db = null,
    request = window.indexedDB.open("fcrDiary", 3);
  request.onsuccess = function(event) {
    //console.log(event);
    db = event.target.result;

    //add data
    var transaction = db.transaction([mystore]);
    transaction.oncomplete = function() {
      console.log("all done!");
    };
    transaction.onerror = function() {
      console.error("an error has occurred: " + transaction.error);
    };

    //get the store
    var store = transaction.objectStore(mystore);
    var index = store.index("timed");
    document.getElementById("writtenC").innerHTML = "";

    //using indes to read
    var customers = [];
    var searchValue = IDBKeyRange.only(value);
    index.openCursor(searchValue).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        customers.push(cursor.value);
        /*if(cursor.value.subject==value){
                    customers.push(cursor.value);
                }*/
        cursor.continue();
      } else {
        //createTable(customers);
        customers.forEach(value => {
          ccontent =
            "<h4>" +
            value.subject +
            "</h4><br/><small>" +
            value.dated +
            ":" +
            value.timed +
            "</small><br/>" +
            value.mywrite +
            "<br />";
          document.getElementById("writtenC").innerHTML += ccontent;
        });
        //console.log(customers);
      }
    };

    /*index.openCursor().onsuccess=function(event){
            var cursor=event.target.result;
            if(cursor){
                if(cursor.value.subject==value){
                    customers.push(cursor.value);
                }
                cursor.continue();
            }else{
                //createTable(customers);
		      console.log(customers);
            }
        }*/

    //read  data
    /* var request1=store.get(payload);
	   request1.onsuccess=function(event){
           console.log(event.target.result);
	   }*/
  };

  request.onerror = function() {
    console.error("an error has occurred: ");
  };
}

export { dataStores, readStores };
