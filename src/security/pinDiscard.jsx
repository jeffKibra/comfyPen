import React, { Component } from "react";
import db from "../component/dbaccess";
import MyNav from "../navs/myNav";

class PinDiscard extends Component {
  state = {
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

  discard = () => {
    db.secret.clear().then(() => {
      this.setState({ set: false });
    });
  };

  render() {
    const { set } = this.state;

    return (
      <>
        <nav>
          <MyNav />
        </nav>

        <div className="container unfixed">
          <div className="card col col-sm-6 col-md-4 col-lg-3 bg-info mx-auto my-3">
            <div className="card-body mx-auto">
              {set === true && (
                <>
                  <p>Are you sure you want to discard your pin?</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={this.discard}
                  >
                    Discard
                  </button>
                </>
              )}
              {set === false && (
                <p>
                  Pin discarded. To set another pin, please head over to menu >
                  security.
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PinDiscard;
