import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Navbar = () => (
  <Router>
    <div>
      <h2>Which body of water</h2>
      <ul>
        <li>
          <Link to="/atlantic">
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to="/pacific">
            <code>/pacific</code>
          </Link>
        </li>
        <li>
          <Link to="/black-sea">
            <code>/Black-sea</code>
          </Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/atlantic" component={Atlantic} />
        <Route path="/pacific" component={Pacific} />
        <Route path="/black-sea" component={BlackSea} />
        <Route
          exact
          path="/"
          render={() => <h3>Select a body of water from above</h3>}
        />
        <Route
          render={({ location }) => (
            <h3 className="bg-danger">
              Error! No matches for <code>{location.pathname}</code>{" "}
            </h3>
          )}
        />
      </Switch>
    </div>
  </Router>
);

const Atlantic = () => (
  <div>
    <h3>The Atlantic Ocean</h3>
    <p>The atlantic ocean covers about 1/5 of the surface of the earth</p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>The Pacific Ocean</h3>
    <p>The pacific Ocean is the bigest ocean in the world</p>
  </div>
);

const BlackSea = () => (
  <div>
    <h3>The Black sea</h3>
    <p>The Black sea is a mystery. Why that name?</p>
  </div>
);
export default Navbar;
