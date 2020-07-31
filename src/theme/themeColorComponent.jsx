import React from "react";
import ColorSelector from "./colorSelector";
import { Button, Grid } from "@material-ui/core";
import { useStyles } from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThemeColor(props) {
  const {
    savePrimaryColor,
    saveSecondaryColor,
    togglePrimarySelector,
    toggleSecondarySelector,
    applyChanges,
    primaryToggleState,
    secondaryToggleState,
    primary,
    secondary,
  } = props;
  const classes = useStyles();
  return (
    <>
      <ColorSelector
        initialColor={primary}
        save={savePrimaryColor}
        toggler={togglePrimarySelector}
        toggleState={primaryToggleState}
        title="Primary color"
        body="This is the main color of the application and it is used in all the main areas like the navigation bar."
      />
      <ColorSelector
        initialColor={secondary}
        save={saveSecondaryColor}
        toggler={toggleSecondarySelector}
        toggleState={secondaryToggleState}
        title="Secondary color"
        body="This is the secondary color of the application and it is used for the minor parts like buttons"
      />
      <Grid container className={classes.root}>
        <Button
          className={classes.margin}
          endIcon={<FontAwesomeIcon icon="paint-brush" />}
          onClick={applyChanges}
        >
          apply
        </Button>
      </Grid>
    </>
  );
}
