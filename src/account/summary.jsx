import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconButton, Typography, Grid, Divider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../component/dbaccess";

const mapStateToProps = (state) => {
  //console.log(state);
  const { journals } = state.firestore.ordered;
  return { journals };
};

function Summary(props) {
  const [pin, setPin] = useState(false);

  useEffect(() => {
    db.pin.count().then((val) => {
      if (val === 0) {
        setPin(false);
      } else {
        setPin(true);
      }
    });
  }, [setPin]);

  const color = pin ? "green" : "red";
  const icon = pin ? "check" : "times";
  //console.log(props);
  const { journals } = props;

  return (
    <>
      <div className="container">
        <Grid container justify="center" alignContent="center">
          <Grid
            direction="column"
            item
            xs={12}
            sm={10}
            md={8}
            justify="center"
            alignContent="center"
            container
          >
            <IconButton id="journals">
              <span style={{ fontSize: "2rem" }}>
                <FontAwesomeIcon icon="book" />
              </span>
            </IconButton>
            <Divider />
            <Typography>
              Account Type: <span>regular</span>
            </Typography>
            <Typography>
              secured with pin:{" "}
              <span style={{ color: color }}>
                <FontAwesomeIcon icon={icon} />
              </span>
            </Typography>

            <Typography>
              Total Journals: <span>{journals?.length}</span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Summary);
