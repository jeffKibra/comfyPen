import React, { Component } from "react";
import PagesNav from "../navs/pagesNav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../component/dbaccess";
import { isLogged, checkKey } from "../component/redux";

const mapStateToSecurity = (state) => {
  return state;
};

const mapDispatchToSecurity = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
  checkKey: (data) => dispatch(checkKey(data)),
});

class SecurityConstruct extends Component {
  state = {
    disabled: false,
    pins: [
      {
        name: "set pin",
        description: "Create a pin to safeguard your entries",
        path: "/setPin",
      },
      {
        name: "change pin",
        description: "Create a pin to safeguard your entries",
        path: "/changePin",
      },
      {
        name: "discard pin",
        description: "Create a pin to safeguard your entries",
        path: "/discardPin",
      },
    ],
  };

  componentDidMount() {
    if (this.props.logged) {
      this.setState({ disabled: false });
    } else {
      db.user.count().then((val) => {
        if (val === 0) {
          this.props.isLogged({ logged: false });
          this.setState({ disabled: true });
        } else {
          this.props.isLogged({ logged: true });
          this.setState({ disabled: false });
        }
      });
    }

    db.pin.count().then((val) => {
      if (val === 0) {
        this.props.checkKey({ storageKey: false });
      } else {
        this.props.checkKey({ storageKey: true });
      }
    });
  }

  render() {
    const { storageKey } = this.props;

    const myCard = this.state.pins.filter((card) => {
      if (storageKey) {
        if (card.name !== "set pin") return card;
      } else {
        if (card.name === "set pin") return card;
      }
    });
    const myCards = myCard.map((pin, index) => {
      return <Cards key={index} disabled={this.state.disabled} card={pin} />;
    });
    return (
      <>
        <nav>
          <PagesNav></PagesNav>
        </nav>
        <div className="container unfixed">
          <div className="row mx-auto  text-center">
            <div
              style={{ fontSize: "15rem" }}
              className="col-12 mx-auto my-0  text-center text-info"
            >
              <FontAwesomeIcon icon="user-shield" />
            </div>
            <div className="col-12 mx-auto my-1 text-center">
              <span>
                {this.props.isLogged === true ? (
                  <p>set a pin to continue</p>
                ) : (
                  <p>You must be logged in to set a pin</p>
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

function Cards(props) {
  const { name, description, path } = props.card;
  return (
    <div className="row">
      <div className=" col-12  text-center">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <p>{description}</p>
          <Link
            to={path}
            className="btn btn-outline-warning"
            disabled={props.disabled}
          >
            {name}
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

const Security = connect(
  mapStateToSecurity,
  mapDispatchToSecurity
)(SecurityConstruct);

export default Security;
