import React from "react";
import { SketchPicker } from "react-color";
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ColorSelectorComponent(props) {
  const {
    title,
    body,
    toggler,
    color,
    toggleState,
    classes,
    saveColor,
    onChangeComplete,
    reset,
  } = props;

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} md={10} lg={8} container>
          <Paper style={{ width: "100%" }} className={classes.paper}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{body}</Typography>
            <Button
              onClick={toggler}
              variant="contained"
              endIcon={
                <FontAwesomeIcon
                  icon={toggleState ? "angle-up" : "angle-down"}
                />
              }
              className={`${classes.button} ${classes.margin}`}
            >
              {toggleState ? (
                <Typography variant="body1">close</Typography>
              ) : (
                <Typography variant="body1">open color selector</Typography>
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {toggleState && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid
            item
            xs={12}
            alignItems="center"
            className={classes.root}
            container
          >
            <SketchPicker color={color} onChangeComplete={onChangeComplete} />
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="center"
            className={classes.root}
            container
          >
            <ButtonGroup className={classes.margin}>
              <Button
                onClick={saveColor}
                variant="contained"
                endIcon={<FontAwesomeIcon icon="save" />}
              >
                Save changes
              </Button>

              <Button
                onClick={reset}
                variant="contained"
                endIcon={<FontAwesomeIcon icon="undo" />}
              >
                Reset
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
