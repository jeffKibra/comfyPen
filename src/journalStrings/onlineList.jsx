import React from "react";
import { setActiveEntry } from "../component/redux";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import db from "../component/dbaccess";
import {
  Badge,
  Divider,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  inline: {
    display: "inline",
  },
  listItem: {
    cursor: "pointer",
  },
}));

const mapStateToOnlineList = (state) => {
  return state;
};

const mapDispatchToOnlineList = (dispatch) => ({
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

function OnlineListConstruct(props) {
  const classes = useStyles();
  const history = useHistory();

  const { activeJournal } = props;
  const savedJournal = activeJournal.savedEntries.map((entry, index) => {
    const setActiveEntry = () => {
      props.setActiveEntry(entry);
      db.activeEntry.clear().then(() => {
        db.activeEntry.add(entry);
      });
      history.push("/read");
    };
    const { subject, createdAt } = entry;

    const date = moment(createdAt).format("LL");
    const time = moment(createdAt).format("LTS");

    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          onClick={setActiveEntry}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar>{subject.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={subject}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${date} - ${time}`}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
  });

  return (
    <div className="container">
      <List className={classes.root}>
        <ListSubheader>
          <Badge
            badgeContent={activeJournal.savedEntries.length}
            color="primary"
          >
            <h6>My Notes</h6>
          </Badge>
        </ListSubheader>
        <Divider component="li" />
        {savedJournal}
      </List>
    </div>
  );
}

const OnlineList = connect(
  mapStateToOnlineList,
  mapDispatchToOnlineList
)(OnlineListConstruct);

export default OnlineList;
