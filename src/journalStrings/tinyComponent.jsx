import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../component/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import SimplePopper from "../component/popper";
import { Info } from "@material-ui/icons";
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";

function TinymceEditor(props) {
  //console.log(props);
  const classes = useStyles();
  const {
    status,
    subject,
    entry,
    register,
    errors,
    journalId,
    getValues,
    checked,
    changeView,
    onEntryChange,
    init,
    mobileInit,
  } = props;

  return (
    <>
      <Grid container justify="center" alignContent="center">
        <Grid
          item
          xs={10}
          sm={9}
          md={7}
          justify="center"
          alignContent="center"
          container
        >
          <TextField
            className={classes.margin}
            label="subject"
            inputRef={register({
              required: { value: true, message: "please provide a subject" },
            })}
            type="text"
            name="subject"
            placeholder="subject"
            helperText={errors.subject?.message}
            error={!!errors.subject?.message}
            defaultValue={subject}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={10}
          sm={9}
          md={7}
          justify="center"
          alignContent="center"
          container
        >
          <FormControlLabel
            control={
              <Switch
                inputProps={{ "aria-label": "mobile mode toggle" }}
                name="mobile"
                onChange={changeView}
                checked={checked}
              />
            }
            label="desktop-mode"
          />
          <SimplePopper
            render={(handleClick) => (
              <Info color="primary" onClick={handleClick} cursor="pointer" />
            )}
          >
            <Typography>
              This setting only works for mobile devices. If you want more power
              in editing, select the desktop mode. It however comes at the cost
              of not being able to paste into the editor. If you want to be able
              to paste, please use the mobile version by disabling the desktop
              mode.
            </Typography>
          </SimplePopper>
        </Grid>
      </Grid>

      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <div className={classes.margin}>
            {checked && (
              <>
                <Editor
                  id={journalId}
                  init={{
                    ...init,
                  }}
                  initialValue={entry}
                  value={getValues("entry")}
                  onEditorChange={onEntryChange}
                />
              </>
            )}
            {!checked && (
              <>
                <Editor
                  id={journalId}
                  init={{
                    ...mobileInit,
                  }}
                  initialValue={entry}
                  value={getValues("entry")}
                  onEditorChange={onEntryChange}
                />
              </>
            )}
            <Typography variant="body2" color="error">
              {errors.entry?.message}
            </Typography>
          </div>
          <Button
            component="button"
            type="submit"
            className={classes.margin}
            aria-controls="save-Button"
            endIcon={<FontAwesomeIcon icon="save" />}
          >
            Save {"  "}
            <Spinner status={status} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

TinymceEditor.propTypes = {
  subject: PropTypes.string.isRequired,
  entry: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  journalId: PropTypes.string.isRequired,
};

export default TinymceEditor;
