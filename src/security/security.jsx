import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../component/dbaccess";
import { checkKey } from "../component/redux";

const mapStateToSecurity = (state) => {
  return state;
};

const mapDispatchToSecurity = (dispatch) => ({
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
        description: "change your pin",
        path: "/changePin",
      },
      {
        name: "discard pin",
        description:
          "Discard your pin! Please note that your journals will be viewed by anybody",
        path: "/discardPin",
      },
      {
        name: "Forgot pin",
        description:
          "Forgot your pin! Please note that you will have to login again!",
        path: "/logout",
      },
    ],
  };

  componentDidMount() {
    db.pin.count().then((val) => {
      if (val === 0) {
        this.props.checkKey({ storageKey: false });
      } else {
        this.props.checkKey({ storageKey: true });
      }
    });
  }

  render() {
    const { storageKey } = this.props.custom;
    //console.log(this.props);
    const isSet = this.state.pins.filter((card) => card.name !== "set pin");
    const notSet = this.state.pins.filter((card) => card.name === "set pin");

    const isSetCards = isSet.map((pin, index) => {
      return <Cards key={index} disabled={this.state.disabled} card={pin} />;
    });
    const notSetCards = notSet.map((pin, index) => {
      return <Cards key={index} disabled={this.state.disabled} card={pin} />;
    });
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
