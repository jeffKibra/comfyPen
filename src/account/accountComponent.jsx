import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AccountComponent(props) {
  const { auth, profile } = props.firebase;
  const { uid, email } = auth;
  const { firstName, lastName } = profile;

  return (
    <>
      <div className="container-fluid unfixed">
        <div className="row mx-auto  text-center">
          <div
            style={{ fontSize: "15rem" }}
            className="col-12 mx-auto my-0  text-center text-info"
          >
            <FontAwesomeIcon icon="user-circle" />
          </div>
          <div className="col-12 mx-auto my-1 text-center">
            <span>
              {uid ? (
                <>
                  <h5>Account Details:</h5>
                  <p>logged in as: {firstName + "  " + lastName} </p>
                  <p>email: {email}</p>
                </>
              ) : (
                <p>Please login below to continue</p>
              )}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="card col-sm-10 mx-auto my-2 text-center bg-info">
            <div className="card-body">
              <MyCards cards={props.cards} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MyCards({ cards }) {
  const loggedInCards = cards.map((card, index) => {
    const { description, name, path } = card;
    return (
      <div className="row">
        <div className=" col-12  text-center ">
          <div className="card-body">
            <p>{description}</p>
            <Link to={path} className="btn btn-outline-warning">
              {name}
            </Link>
          </div>
        </div>
      </div>
    );
  });
  return <>{loggedInCards}</>;
}
