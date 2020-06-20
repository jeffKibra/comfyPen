import $ from "jquery";

function addEntry(entryData) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const { journalId, entryId } = entryData;
    //console.log({ userId, entryId, journalId, entryData });

    firestore
      .collection("users")
      .doc(userId)
      .collection("journals")
      .doc(journalId)
      .collection("entries")
      .doc(entryId)
      .set(entryData, { merge: true })
      .then(() => {
        dispatch(finish("data saved"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        dispatch(finish("error saving"));
        $("#snackBarTrigger").trigger("click");
        console.log(err);
      });
  };
}

function deleteEntry(entryData) {
  return (dispatch, getState, { getFirestore }) => {
    // dispatch(loading());
    const { entryId, journalId } = entryData;
    const userId = getState().firebase.auth.uid;
    //console.log({ userId, entryId, journalId, entryData });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection("journals")
      .doc(journalId)
      .collection("entries")
      .doc(entryId)
      .delete()
      .then((val) => {
        //console.log(val);
        dispatch(finish("deleted!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(finish("deletion failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

function updateEntry(entryData) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const { entryId, journalId } = entryData;
    const userId = getState().firebase.auth.uid;
    //console.log({ userId, entryId, journalId });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection("journals")
      .doc(journalId)
      .collection("entries")
      .doc(entryId)
      .update(entryData)
      .then((val) => {
        //console.log(val);
        dispatch(finish("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(finish("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

function updateJournal(journalData) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const { journalId } = journalData;
    const userId = getState().firebase.auth.uid;
    console.log({ userId, journalId, journalData });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection("journals")
      .doc(journalId)
      .update(journalData)
      .then((val) => {
        //console.log(val);
        dispatch(finish("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(finish("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

function newJournal(journalData) {
  return (dispatch, getState, { getFirestore }) => {
    //dispatch(loading());
    const { journalId } = journalData;
    const userId = getState().firebase.auth.uid;
    console.log({ userId, journalId, journalData });
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .collection("journals")
      .doc(journalId)
      .set(journalData)
      .then((val) => {
        //console.log(val);
        dispatch(finish("updated!"));
        $("#snackBarTrigger").trigger("click");
      })
      .catch((err) => {
        console.log(err);
        dispatch(finish("update failed! Please try again later"));
        $("#snackBarTrigger").trigger("click");
      });
  };
}

function finish(msg) {
  return { type: "FINISH_LOADING", loading: false, msg };
}

function loading() {
  return { type: "LOADING", loading: true };
}

export {
  addEntry,
  updateEntry,
  deleteEntry,
  loading,
  finish,
  updateJournal,
  newJournal,
};
