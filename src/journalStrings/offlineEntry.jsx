import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import UnsavedNav from "../navs/unsavedNav";

import {
  Divider,
  Badge,
  Avatar,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  ListItemSecondaryAction
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
  check: {
    marginRight: theme.spacing(2)
  }
}));

const OfflineJournal = props => {
  const classes = useStyles();
  const { journal, switchToOnline } = props;

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  });

  const onFormSubmit = (data, e) => {
    props.onFormSubmit(data);
    e.target.reset();
  };

  const [allValues, setValues] = useState(false);

  const onAllChange = e => {
    setValues(e.target.checked);
  };

  const unSavedEntries = journal.map((entry, index) => (
    <UnsavedList
      setValue={setValue}
      register={register}
      value={allValues}
      entry={entry}
      key={index}
      onRead={props.onRead}
    />
  ));

  return (
    <>
      <nav>
        <UnsavedNav switchToOnline={switchToOnline} onWrite={props.onWrite} />
      </nav>
      <div className="container unfixed">
        <List className={classes.root}>
          <ListSubheader>
            <Badge badgeContent={journal.length} color="secondary">
              <h6>My Notes</h6>
            </Badge>
            <Checkbox
              onChange={onAllChange}
              className={classes.check}
              edge="end"
              name="all"
            />
          </ListSubheader>
          <Divider component="li" />

          <form onSubmit={handleSubmit(onFormSubmit)}>
            {unSavedEntries}
            <button
              style={{ display: "none" }}
              className="btn btn-outline-warning"
              id="formBtn"
            >
              save
            </button>
          </form>
        </List>
      </div>
    </>
  );
};

export default OfflineJournal;

function UnsavedList(props) {
  const classes = useStyles();
  const { register } = props;
  const { subject, date, time, entryid } = props.entry;
  const onRead = () => {
    props.onRead(props.entry);
  };

  const [checked, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const checkedChange = e => {
    setValue(e.target.checked);
  };

  return (
    <div>
      <ListItem onClick={onRead} alignItems="flex-start">
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
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            inputRef={register}
            onChange={checkedChange}
            checked={checked}
            name={entryid}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
