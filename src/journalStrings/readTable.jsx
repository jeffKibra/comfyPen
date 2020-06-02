import React from "react";
import { onRead, onWrite } from "../component/redux";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  Divider,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  inline: {
    display: "inline"
  },
  listItem: {
    cursor: "pointer"
  }
}));

const mapDispatchToReadTable = dispatch => ({
  onRead: data => dispatch(onRead(data)),
  onWrite: () => dispatch(onWrite())
});

function ReadTableConstruct(props) {
  const classes = useStyles();

  const { journal, onWrite } = props;
  const savedJournal = journal.map((entry, index) => {
    const onRead = () => {
      props.onRead(entry);
    };
    const { subject, date, time } = entry;
    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          onClick={onRead}
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
          <Badge badgeContent={journal.length} color="primary">
            <h6>My Notes</h6>
          </Badge>
        </ListSubheader>
        <Divider component="li" />
        {savedJournal}
      </List>

      <button onClick={onWrite} className="btn btn-outline-primary write-btn">
        <i className="fas fa-pen-alt"></i>
      </button>
    </div>
  );
}

const ReadTable = connect(null, mapDispatchToReadTable)(ReadTableConstruct);

export default ReadTable;
