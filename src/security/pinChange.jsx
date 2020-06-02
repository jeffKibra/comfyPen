import React, { Component } from "react";
import PinForm from "./pinForm";
import PinSignup from "./pinSignup";
import db from "../component/dbaccess";
import MyNav from "../navs/myNav";

class PinChange extends Component {
  state = {
    current: 0,
    set: false
  };

  componentDidMount() {
    db.secret.count().then(val => {
      if (val === 0) {
        this.setState({ set: false });
      } else {
        this.setState({ set: true });
      }
    });
  }

  next = data => {
    const current = this.state.current + 1;
    db.secret
      .where("key")
      .equals(data.pin)
      .count()
      .then(val => {
        if (val === 0) {
          alert("invalid pin");
        } else {
          db.secret.clear();
          this.setState({ current });
        }
      });
  };

  render() {
    const { current, set } = this.state;

    return (
      <>
        {set === false && (
          <>
            <nav>
              <MyNav />
            </nav>

            <div className="container unfixed">
              <div className="card col col-sm-6 col-md-4 col-lg-3 bg-info mx-auto my-3">
                <div className="card-body mx-auto">
                  <p>Please set a pin first before trying to change it.</p>
                </div>
              </div>
            </div>
          </>
        )}
        {set === true && (
          <>
            {current === 0 && (
              <>
                <PinForm next={this.next} />
              </>
            )}
            {current === 1 && (
              <>
                <PinSignup />
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default PinChange;
