import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
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
    overflow: "auto",
    maxHeight: 300
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
  }
}));

const Journal = props => {
  const { date, time, subject } = props.records;
  const { readEntry } = props;

  const onReadClick = () => {
    readEntry(props.records);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <List className={classes.root}>
        <ListSubheader component="h3">None</ListSubheader>
        <Divider variant="inset" component="li" />
        <ListItem onClick={onReadClick} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {subject}
                </Typography>
                {`${date} - ${time}`}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </React.Fragment>
  );
};

export default Journal;
