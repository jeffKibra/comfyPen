import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Grid, Divider } from "@material-ui/core";
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";

export default function Cards(props) {
  const classes = useStyles();

  const { name, description, path } = props.card;
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} sm={10} md={8} className={classes.margin}>
        {" "}
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
        <Button component={Link} to={path} className={classes.margin}>
          {name}
        </Button>
        <Divider />
      </Grid>
    </Grid>
  );
}

Cards.propTypes = {
  card: PropTypes.object.isRequired,
};
