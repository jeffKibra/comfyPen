import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summary from "./summary";
import FirebaseUI from "./firebaseUI";
import Logout from "./logout";
import { Typography } from "@material-ui/core";

export default function AccountComponent(props) {
  const { classes, firebase } = props;
  const { auth, profile } = firebase;
  const { uid, email, displayName } = auth;
  const { firstName, lastName } = profile;

  return (
    <>
      <div className="container-fluid ">
        <div className="row mx-auto  text-center">
          <div
            className={`${classes.mainIcon}  col-12 mx-auto my-0  text-center`}
          >
            <FontAwesomeIcon icon="user-circle" />
          </div>
          <div className="col-12 mx-auto my-1 text-center">
            <span>
              {uid ? (
                <>
                  <Typography variant="h3">
                    {displayName || firstName + "  " + lastName}
                  </Typography>
                  <Typography variant="h5">{email}</Typography>

                  <Summary />
                  <Logout />
                </>
              ) : (
                <>
                  <Typography variant="body1" component="p">
                    Please Sign in below to continue
                  </Typography>

                  <FirebaseUI />
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
