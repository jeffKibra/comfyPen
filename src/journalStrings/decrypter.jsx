import React, { useState, useEffect } from "react";
import { decrypt } from "../component/enctype";
import MainBackdrop from "../component/backdrop";

export default function Decrypter(WrappedComponent) {
  function HOC(props) {
    const [state, setState] = useState({ entry: {} });
    const { entry, history, email } = props;

    useEffect(() => {
      if (!entry.entryId) {
        return history.goBack();
      }
      decryptEntry(entry);
      //console.log(entry, "entry changed");
      async function decryptEntry() {
        const customEntry = entry?.customEntry;
        if (!!customEntry) {
          const decrypted = await decrypt(
            entry.entry,
            email,
            entry.customEntry
          );
          setState({ entry: { ...entry, entry: decrypted } });
          //return decrypted;
        } else {
          setState({ entry });
        }
      }
    }, [entry, email, history]);

    //console.log(state);
    const entryId = state.entry.entryId;

    return (
      <>
        {entryId ? (
          <WrappedComponent {...props} entry={state.entry} />
        ) : (
          <MainBackdrop status={!!entryId} />
        )}
      </>
    );
  }
  return HOC;
}
