import React from "react";
import { connect } from "react-redux";
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
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  return state;
};

function OnlineList(props) {
  const classes = useStyles();

  const { entries, journal, match } = props;
  const { journalId } = match.params;

  const savedJournal = entries.map((entry, index) => {
    const { subject, createdAt, entryId } = entry;

    const date = moment(createdAt).format("LL");
    const time = moment(createdAt).format("LTS");

    return (
      <Link
        to={{
          pathname: "/read/" + journalId + ":" + entryId,
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
                  variant="caption"
                  className={classes.listInline}
                  //color="textPrimary"
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
      <List className={classes.listRoot}>
        <ListSubheader>
          <Badge badgeContent={entries.length || 0} color="primary">
            <Typography variant="subtitle1">
              {journal.journalName ? journal.journalName : "My Notes"}
            </Typography>
          </Badge>
        </ListSubheader>
        <Divider component="li" />
        {savedJournal}
      </List>
    </div>
  );
}

OnlineList.propTypes = {
  journal: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
};

export default compose(withRouter, connect(mapStateToProps))(OnlineList);
