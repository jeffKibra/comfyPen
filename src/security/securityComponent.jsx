import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SecurityComponent(props) {
  const { storageKey, isSetCards, notSetCards } = props;

  return (
    <>
      <div className="container unfixed">
        <div className="row mx-auto  text-center">
          <div
            style={{ fontSize: "15rem" }}
            className="col-12 mx-auto my-0  text-center text-info"
          >
            <FontAwesomeIcon icon="user-shield" />
          </div>
        </div>
        <div className="row">
          <div className="card col-sm-10 mx-auto my-2 text-center bg-info">
            <div className="card-body">
              {storageKey ? (
                <div className="text-center mx-auto">
                  <h6>Your journals are safeguarded with a pin!</h6>
                  {isSetCards}
                </div>
              ) : (
                <div className="text-center mx-auto">
                  <h6>Set a pin to safeguard your journals!</h6>
                  {notSetCards}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecurityComponent;
