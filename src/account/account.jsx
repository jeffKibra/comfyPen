import React, { Component } from "react";
import PagesNav from "../navs/pagesNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../component/dbaccess";
import { isLogged } from "../component/redux";
import { connect } from "react-redux";

const mapStateToAccount = (state) => {
  return state;
};

const mapDispatchToAccount = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
});

class AccountConstruct extends Component {
  state = {
    email: "",
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

  componentDidMount() {
    db.user.toArray().then((val) => {
      if (val.length === 0) {
        this.props.isLogged({ logged: false });
        this.setState({ email: "" });
      } else {
        this.props.isLogged({ logged: true });
        this.setState({ email: val[0].email });
      }
    });
  }

  render() {
    const { logged } = this.props;
    const myCard = this.state.body.filter((card, index) => {
      if (logged) {
        if (card.name !== "login") return card;
      } else {
        if (card.name !== "logout") return card;
      }
    });

    const myCards = myCard.map((card, index) => (
      <MyCards key={index} card={card} />
    ));

    return (
      <>
        <nav>
          <PagesNav></PagesNav>
        </nav>
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
                {logged === true ? (
                  <p>logged in as: {this.state.email}</p>
                ) : (
                  <p>Please login below to continue</p>
                )}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="card col-sm-10 mx-auto my-2 text-center bg-info">
              <div className="card-body">{myCards}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function MyCards(props) {
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

const Account = connect(
  mapStateToAccount,
  mapDispatchToAccount
)(AccountConstruct);

export default Account;
