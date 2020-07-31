import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  // console.log(theme);
  return {
    flex: {
      display: "flex",
      //flexDirection: "column",
      flexWrap: "wrap",
      flexGrow: 1,
    },
    vertCenter: {
      alignContent: "center",
    },
    horCenter: {
      justifyContent: "center",
    },
    root: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    paper: (props) => {
      //console.log(props);
      return {
        flexDirection: "column",
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: "center",
        backgroundColor: props.color,
        //background: `linear-gradient(45deg, ${theme.palette.primary.main} 40%, ${props.color} 60%)`,
      };
    },

    card: {
      padding: theme.spacing(1),
      margin: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    cardAuth: {
      maxWidth: 500,
    },
    fab: {
      position: "fixed",
      right: " 5%",
      bottom: "8%",
    },
    readFab: {
      fontSize: "1.5rem",
    },
    cardWidth: {
      maxWidth: 250,
      height: 300,
    },
    cardActions: {
      alignSelf: "flex-end",
    },
    margin: {
      margin: theme.spacing(1),
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
    success: {
      backgroundColor: theme.palette.success.main,
    },
    mainIcon: {
      fontSize: "10rem",
      color: theme.palette.primary.main,
    },
    button: (props) => ({
      background: `linear-gradient(45deg, ${props.color} 30%, ${theme.palette.secondary.main} 90% )`,
    }),
    menuButton: { marginRight: theme.spacing(2) },
    title: { flexGrow: 1 },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    //list
    listRoot: {
      width: "100%",
      maxWidth: "100vw",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
    },
    listSection: {
      backgroundColor: "inherit",
    },
    listUl: {
      backgroundColor: "inherit",
      padding: 0,
    },
    listInline: {
      display: "inline",
    },
    listItem: {
      cursor: "pointer",
    },
  };
});

/*const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
    },
    secondary: {
      main: "#ffc107",
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary",
    },
  },
});*/

export { useStyles };
