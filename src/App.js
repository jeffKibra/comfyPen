import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from "./account/account";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Security from "./security/security";
import JournalContainer from "./journalComponent/journalContainer";
import Terms from "./component/terms";
import Privacy from "./component/privacy";
import NewEntry from "./journalStrings/newEntry";
import OnlineReader from "./journalStrings/onlineReader";
import Read from "./journalStrings/read";
import Updater from "./journalStrings/updater";
import PinSignup from "./security/pinSignup";
import PinChange from "./security/pinChange";
import PinDiscard from "./security/pinDiscard";
import Login from "./account/login";
import Signup from "./account/signup";
import Logout from "./account/logout";
import MainNav from "./navs/mainNav";
import Protected from "./protected";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolderOpen,
  faEdit,
  faTrashAlt,
  faLockOpen,
  faBookOpen,
  faUserEdit,
  faPenAlt,
  faSave,
  faPlus,
  faTimes,
  faStickyNote,
  faArrowLeft,
  faEllipsisV,
  faCog,
  faHome,
  faKey,
  faUserCog,
  faUserLock,
  faUserShield,
  faUser,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/js/bootstrap.bundle";
import "./css/prism.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

library.add(
  faFolderOpen,
  faEdit,
  faTrashAlt,
  faLockOpen,
  faBookOpen,
  faUserEdit,
  faPenAlt,
  faSave,
  faPlus,
  faTimes,
  faStickyNote,
  faArrowLeft,
  faEllipsisV,
  faCog,
  faHome,
  faKey,
  faUserCog,
  faUserLock,
  faUserShield,
  faUser,
  faBars,
  faUserCircle
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

function App() {
  return (
    <>
      <Router>
        <nav>
          <MainNav />
        </nav>

        <main style={{ marginBottom: 100 }} className="container unfixed">
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/account" component={Account} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/logout" component={Logout} />
              <Protected path="/onlineList/:journalId">
                <OnlineReader />
              </Protected>
              <Protected path="/read/:entryId">
                <Read />
              </Protected>
              <Protected path="/write/:journalId">
                <NewEntry />
              </Protected>
              <Protected path="/edit/:entryId">
                <Updater />
              </Protected>
              <Protected path="/setPin">
                <PinSignup />
              </Protected>
              <Protected path="/changePin">
                <PinChange />
              </Protected>
              <Protected path="/discardPin">
                <PinDiscard />
              </Protected>
              <Protected path="/security">
                <Security />
              </Protected>
              <Protected exact path="/">
                <JournalContainer />
              </Protected>
            </Switch>
          </ThemeProvider>
        </main>
      </Router>
    </>
  );
}

export default App;
