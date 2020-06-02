import React, { Component } from "react";
import db from "../component/dbaccess";
import SnackBar from "../component/snackBar";
import MyNav from "../navs/myNav";
import KeyForm from "./keyForm";

class PinSignup extends Component {
  state = {
    open: false,
    set: false,
    logged: false
  };

  componentDidMount() {
    db.users.count().then(val => {
      if (val === 0) {
        this.setState({ logged: false });
      } else {
        this.setState({ logged: true });
      }
    });
    db.secret.count().then(val => {
      if (val === 0) {
        this.setState({ set: false });
      } else {
        this.setState({ set: true });
      }
    });
  }

  pinSignup = data => {
    const keyData = {
      key: data.pin
    };
    db.secret.clear().then(() => {
      db.secret
        .add(keyData)
        .then(() => {
          this.setState({ open: true, set: true });
          //props.checkKey({ storageKey: true });
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  render() {
    return (
      <>
        <nav>
          <MyNav />
        </nav>
        <div className="container unfixed">
          <div className="card col col-sm-6 col-md-4 col-lg-3 mx-auto bg-info my-3">
            <div className="card-body mx-auto">
              {this.state.logged === false && (
                <>
                  <p>
                    Please Ensure that you are logged in before attempting to
                    create a pin!
                  </p>
                </>
              )}
              {this.state.logged === true && (
                <>
                  {this.state.set === false && (
                    <KeyForm onSubmit={this.pinSignup} />
                  )}
                  {this.state.set === true && (
                    <>
                      <p>
                        You have a pin already set. To change or remove your
                        pin, head over to menu > security options!
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <SnackBar open={this.state.open} msg="pin set" />
        </div>
      </>
    );
  }
}

export default PinSignup;
