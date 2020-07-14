import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { compose } from "recompose";
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

const mapStateToProps = (state) => {
  return state;
};

function OnlineList(props) {
  const classes = useStyles();

  const { entries, journal } = props;

  const savedJournal = entries.map((entry, index) => {
    const { subject, createdAt, entryId } = entry;

    const date = moment(createdAt).format("LL");
    const time = moment(createdAt).format("LTS");

    return (
      <Link
        to={{
          pathname: "/read/" + entryId,
          state: { from: props.location },
        }}
        key={index}
        style={{ color: "#000", textDecoration: "none" }}
      >
        <ListItem className={classes.listItem} alignItems="flex-start">
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
      </Link>
    );
  });

  return (
    <div className="container">
      <List className={classes.root}>
        <ListSubheader>
          <Badge badgeContent={entries.length} color="primary">
            <h6>{journal.journalName ? journal.journalName : "My Notes"}</h6>
          </Badge>
        </ListSubheader>
        <Divider component="li" />
        {savedJournal}
      </List>
    </div>
  );
}

export default compose(withRouter, connect(mapStateToProps))(OnlineList);
