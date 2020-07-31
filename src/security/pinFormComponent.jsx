import React from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
} from "@material-ui/core";
import { useStyles } from "../theme/theme";
import PasswordInput from "../component/passwordInput";

function PinFormComponent(props) {
  const { register, errors } = props;
  const classes = useStyles();

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} justify="center" alignContent="center" container>
        <Card
          className={`${classes.card} ${classes.cardAuth} ${classes.margin}`}
        >
          <CardContent>
            <Box display="flex" p={1}>
              {" "}
              <Typography variant="h6"> Enter your pin to continue!</Typography>
            </Box>
            <PasswordInput
              name="pin"
              register={register}
              registerObject={{
                required: {
                  value: true,
                  message: "please provide a pin",
                },
                minLength: {
                  value: 4,
                  message: "your pin must be atleast 4 characters long",
                },
              }}
              errors={errors}
            />

            <CardActions>
              <Button component="button" type="submit">
                continue
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PinFormComponent;
