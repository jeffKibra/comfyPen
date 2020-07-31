import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from "./account/account";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import Security from "./security/security";
import JournalContainer from "./journalComponent/journalContainer";
import Terms from "./component/terms";
import Privacy from "./component/privacy";
import NewEntry from "./journalStrings/newEntry";
import OnlineReader from "./journalStrings/onlineReader";
import Read from "./journalStrings/read";
import PinSignup from "./security/pinSignup";
import PinChange from "./security/pinChange";
import PinDiscard from "./security/pinDiscard";
import Login from "./account/login";
import Signup from "./account/signup";
import MainNav from "./navs/mainNav";
import Protected from "./component/protected";
import SnackBar from "./component/snackBar";
import ThemeColor from "./theme/themeColor";
//import { theme } from "./theme/theme";
import { connect } from "react-redux";

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
  faBook,
  faCheck,
  faPaintBrush,
  faAngleUp,
  faAngleDown,
  faUndo,
  faSun,
  faMoon,
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
  faUserCircle,
  faBook,
  faCheck,
  faPaintBrush,
  faAngleUp,
  faAngleDown,
  faUndo,
  faSun,
  faMoon
);

const mapStateToProps = (state) => {
  const { profile } = state.firebase;
  return { profile };
};

function App(props) {
  const primary = props.profile.theme?.primary;
  const secondary = props.profile.theme?.secondary;
  const darkMode = props.profile.theme?.darkMode;
  //console.log(props);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: primary || "#17a2b8",
      },
      secondary: {
        main: secondary || "#ffc107",
      },
    },

    props: {
      MuiFab: {
        color: "primary",
      },
      MuiButton: {
        variant: "contained",
        color: "secondary",
      },
      MuiButtonGroup: {
        variant: "contained",
        color: "secondary",
      },
      MuiTextField: {
        size: "small",
      },
    },
  });
  return (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <nav>
            <MainNav />
          </nav>

          <main style={{ marginBottom: 100 }} className=" unfixed">
            <Switch>
              <Protected path="/onlineList/:journalId">
                <OnlineReader />
              </Protected>

              <Route path="/account" component={Account} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/theme" component={ThemeColor} />
              <Protected exact path="/">
                <JournalContainer />
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

              <Protected path="/read/:entryId">
                <Read />
              </Protected>

              <Protected path="/write/:journalId">
                <NewEntry />
              </Protected>
            </Switch>
          </main>
          <SnackBar />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default connect(mapStateToProps)(App);
