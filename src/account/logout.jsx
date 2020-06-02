import React, { Component } from "react";
import Nav from "../navs/myNav";
import db from "../component/dbaccess";

class Logout extends Component {
  state = {
    status: false
  };

  onLogout = () => {
    db.users.clear().then(() => {
      db.secret.clear().then(() => {
        db.onlineJournalList.clear().then(() => {
          db.savedEntries.clear().then(() => {
            this.setState({ status: true });
          });
        });
      });
    });
  };

  render() {
    const { status } = this.state;
    return (
      <>
        <nav>
          <Nav />
        </nav>
        <div className="container unfixed">
          <div className="card col-sm-6 col-md-4 mx-auto bg-info text-white ">
            <div className="card-body">
              {status === false && (
                <>
                  <h3 className="card-title">Logout?</h3>
                  <p className="card-text">
                    Are you sure you want to logout? Please note that all your
                    unsaved records will be lost. Ensure you save any important
                    entries to your online storage!!
                  </p>
                  <button
                    onClick={this.onLogout}
                    className="btn btn-outline-warning"
                  >
                    Logout
                  </button>
                </>
              )}
              {status === true && (
                <p className="card-text">You have successfully logged out.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Logout;
