import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLogged } from "../component/redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  //console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
});

class Account extends Component {
  state = {
    body: [
      {
        name: "login",
        description: "Login to access your account",
        path: "/login",
      },
      {
        name: "signup",
        description: "Don't have an account? Signup.",
        path: "/signup",
      },
      {
        name: "logout",
        description: "Do a clean up",
        path: "/logout",
      },
    ],
  };

  render() {
    const { auth, profile } = this.props.firebase;
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
                <MyCards {...this.props} body={this.state.body} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function MyCards(props) {
  const { uid } = props.firebase.auth;
  const loggedIn = props.body.filter((card, index) => card.name === "logout");
  const loggedOut = props.body.filter((card, index) => card.name !== "logout");
  const loggedInCards = loggedIn.map((card, index) => (
    <Mapping key={index} card={card} />
  ));
  const loggedOutCards = loggedOut.map((card, index) => (
    <Mapping key={index} card={card} />
  ));

  return <>{uid ? loggedInCards : loggedOutCards}</>;
}

function Mapping(props) {
  const { name, description, path } = props.card;
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
