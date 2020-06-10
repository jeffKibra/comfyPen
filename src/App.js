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
import OfflineReader from "./journalStrings/offlineReader";
import Read from "./journalStrings/read";
import Updater from "./journalStrings/updater";
import PinSignup from "./security/pinSignup";
import PinChange from "./security/pinChange";
import PinDiscard from "./security/pinDiscard";
import Login from "./account/login";
import Signup from "./account/signup";
import Logout from "./account/logout";

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
    <Router>
      <main style={{ marginBottom: 100 }}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={JournalContainer} />
            <Route path="/account" component={Account} />
            <Route path="/onlineList" component={OnlineReader} />
            <Route path="/offlineList" component={OfflineReader} />
            <Route path="/read" component={Read} />
            <Route path="/write" component={NewEntry} />
            <Route path="/edit" component={Updater} />
            <Route path="/security" component={Security} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/setPin" component={PinSignup} />
            <Route path="/changePin" component={PinChange} />
            <Route path="/discardPin" component={PinDiscard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </ThemeProvider>
      </main>
    </Router>
  );
}

export default App;
