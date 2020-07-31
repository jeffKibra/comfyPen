import React from "react";
import db from "../component/dbaccess";
import KeyForm from "./keyForm";
import { connect } from "react-redux";
import { checkKey } from "../component/redux";
import { useHistory } from "react-router-dom";
import { encryptPin } from "../component/enctype";
import { Card, CardContent, Grid } from "@material-ui/core";
import { useStyles } from "../theme/theme";

const mapStateToPinSignup = (state) => {
  return state;
};

const mapDispatchToPinSignup = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

function PinSignupConstruct(props) {
  const history = useHistory();
  const classes = useStyles();
  const pinSignup = async (data) => {
    //console.log(data);
    const hashedPin = await encryptPin(data.pin);
    const keyData = {
      pin: hashedPin,
    };
    db.pin
      .clear()
      .then(() => {
        return db.pin.add(keyData);
      })
      .then((val) => {
        //console.log({ val, done: "done" });
        props.checkKey({ storageKey: true });
        history.push("/security");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} justify="center" alignContent="center" container>
          <Card className={`${classes.card} ${classes.cardAuth}`}>
            <CardContent className=" mx-auto">
              <KeyForm onFormSubmit={pinSignup} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

const PinSignup = connect(
  mapStateToPinSignup,
  mapDispatchToPinSignup
)(PinSignupConstruct);

export default PinSignup;
