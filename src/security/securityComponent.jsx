import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography, Grid } from "@material-ui/core";

function SecurityComponent(props) {
  const { storageKey, isSetCards, notSetCards, classes } = props;

  return (
    <>
      <Grid container justify="center" alignContent="center">
        <Grid
          item
          xs={12}
          className={`${classes.mainIcon} ${classes.margin} `}
          justify="center"
          alignContent="center"
          container
        >
          <FontAwesomeIcon icon="user-shield" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Paper className={`${classes.card} `}>
            {storageKey ? (
              <div className="text-center mx-auto">
                <Typography variant="h6" component="h6">
                  Your journals are safeguarded with a pin!
                </Typography>

                {isSetCards}
              </div>
            ) : (
              <div className="text-center mx-auto">
                <Typography variant="h6" component="h6">
                  Set a pin to safeguard your journals!
                </Typography>

                {notSetCards}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default SecurityComponent;
