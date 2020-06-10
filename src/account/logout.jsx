import React, { Component } from "react";
import PagesNav from "../navs/pagesNav";
import db from "../component/dbaccess";
import Fetcher from "../component/server";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  state = {
    status: false,
  };

  onLogout = () => {
    Fetcher({ submit: "logout" }, "POST").then((val) => {
      db.user.clear().then(() => {
        db.pin.clear().then(() => {
          db.customJournalsList.clear().then(() => {
            db.savedEntries.clear().then(() => {
              this.setState({ status: true });
              this.props.history.push("/account");
            });
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
          <PagesNav></PagesNav>
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

export default withRouter(Logout);
