import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            myDiary
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navcontent"
            aria-controls="navcontent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcontent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active mx-2">
                <Link to="/" className="nav-link text-center">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/myJournals" className="nav-link text-center">
                  Journals
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-center" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-center" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
