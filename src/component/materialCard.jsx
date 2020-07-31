import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

function MaterialCard(props) {
  const { title, subheader } = props;
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Typography variant="body1">classic</Typography>
        <CardActions></CardActions>
      </CardContent>
    </Card>
  );
}

export default MaterialCard;
