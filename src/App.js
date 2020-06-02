import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupForm from "./account/signup";
import LoginForm from "./account/login";
import Logout from "./account/logout";
import OfflineJournal from "./offline/offlineJournal";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import PinChange from "./security/pinChange";
import PinSignup from "./security/pinSignup";
import PinDiscard from "./security/pinDiscard";
import JournalContainer from "./journalComponent/journalContainer";
import Terms from "./component/terms";
import Privacy from "./component/privacy"

import "./App.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8"
    },
    secondary: {
      main: "#ffc107"
    }
  }
});

function App() {
  return (
    <Router>
      <main style={{ marginBottom: 100 }}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={JournalContainer} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/myJournals" component={JournalContainer} />
            <Route path="/offline" component={OfflineJournal} />
            <Route path="/pinChange" component={PinChange} />
            <Route path="/pinSignup" component={PinSignup} />
            <Route path="/pinDiscard" component={PinDiscard} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
          </Switch>
        </ThemeProvider>
      </main>
    </Router>
  );
}

export default App;
