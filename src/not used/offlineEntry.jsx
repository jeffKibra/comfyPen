import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { setActiveEntry } from "../component/redux";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import db from "../component/dbaccess";
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
  ListItemSecondaryAction,
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
  check: {
    marginRight: theme.spacing(2),
  },
}));

const mapStateToOfflineEntry = (state) => {
  return state;
};

const mapDispatchToOfflineEntry = (dispatch) => ({
  setActiveEntry: (data) => dispatch(setActiveEntry(data)),
});

const OfflineEntryConstruct = (props) => {
  const classes = useStyles();
  const { activeJournal } = props;

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onFormSubmit = (data, e) => {
    props.onFormSubmit(data);
    e.target.reset();
  };

  const [allValues, setValues] = useState(false);

  const onAllChange = (e) => {
    setValues(e.target.checked);
  };

  const unsavedEntries = activeJournal.unsavedEntries.map((entry, index) => (
    <UnsavedList
      setValue={setValue}
      register={register}
      value={allValues}
      entry={entry}
      key={index}
      setActiveEntry={props.setActiveEntry}
    />
  ));

  return (
    <>
      <div className="container unfixed">
        <List className={classes.root}>
          <ListSubheader>
            <Badge
              badgeContent={activeJournal.unsavedEntries.length}
              color="secondary"
            >
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
            {unsavedEntries}
            <button
              style={{ display: "none" }}
              className="btn btn-outline-warning"
              id="saveUnsavedEntries"
            >
              save
            </button>
          </form>
        </List>
      </div>
    </>
  );
};

const OfflineEntry = connect(
  mapStateToOfflineEntry,
  mapDispatchToOfflineEntry
)(OfflineEntryConstruct);

export default OfflineEntry;

function UnsavedList(props) {
  const classes = useStyles();
  const { register } = props;
  const { subject, createdAt, entryId } = props.entry;
  const history = useHistory();

  const setActiveEntry = () => {
    props.setActiveEntry(props.entry);
    db.activeEntry.clear().then(() => {
      db.activeEntry.add(props.entry);
    });
    history.push("/read");
  };

  const [checked, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const checkedChange = (e) => {
    setValue(e.target.checked);
  };

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <div>
      <ListItem onClick={setActiveEntry} alignItems="flex-start">
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
            name={entryId}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
