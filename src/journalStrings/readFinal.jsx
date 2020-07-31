import React from "react";
import sanitizeHtml from "sanitize-html";
import * as moment from "moment";
import MoreMenu from "./moreMenu";
import { Paper, Box, Typography, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

function ReadFinal(props) {
  const { subject, entry, createdAt } = props.entry;

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });

  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };
  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <div className="container">
      <Paper style={{ minHeight: "80vh" }}>
        <Box display="flex" flexDirection="column" m={1}>
          <Box display="flex" padding={2} alignItems="center">
            <Box display="flex" flexGrow={1} flexDirection="column">
              <Typography variant="h5">{subject}</Typography>
              <Typography variant="caption">{`${date} ${time}`}</Typography>
            </Box>
            <MoreMenu {...props} />
          </Box>
          <Divider />
          <Box padding={2}>{myComponent()}</Box>
        </Box>
      </Paper>
    </div>
  );
}

ReadFinal.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default ReadFinal;
