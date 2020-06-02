import React, { useState } from "react";
import OfflineReader from "./offlineReader";
import OnlineReader from "./onlineReader";

function ReaderPage(props) {
  const { onWrite, onView, fetchList } = props;
  const [online, setOnline] = useState(true);

  const switchToOnline = () => {
    setOnline(true);
  };
  const switchToOffline = () => {
    setOnline(false);
  };

  return (
    <div>
      {online === true && (
        <OnlineReader
          switchToOffline={switchToOffline}
          fetchList={fetchList}
          onView={onView}
          onWrite={onWrite}
        />
      )}
      {online === false && (
        <OfflineReader
          switchToOnline={switchToOnline}
          fetchList={fetchList}
          onView={onView}
          onWrite={onWrite} //reveal onWriter
        />
      )}
    </div>
  );
}

export default ReaderPage;
