function Sync(entryData) {
  if (!("SyncManager" in window)) {
    //db.unsavedEntries.add(entryData);
    console.log("your browser does not support background sync");
  } else {
    navigator.serviceWorker.ready
      .then((registration) => {
        console.log(registration);
        //register
        registration.sync.register(entryData.entryid).then(() => {
          //db.unsavedEntries.add(entryData);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Sync;
