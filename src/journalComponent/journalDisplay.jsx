import React from "react";
import * as moment from "moment";
import { setActiveJournal, isLogged } from "../component/redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { useStyles } from "../theme/theme";

const mapDispatchToJournalDisplay = (dispatch) => ({
  setActiveJournal: (journal) => dispatch(setActiveJournal(journal)),
  isLogged: (data) => dispatch(isLogged(data)),
});

function JournalDisplayConstruct(props) {
  const classes = useStyles();
  const journal = props.journal;
  const { journalName, journalDescription, createdAt, journalId } = journal;

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <>
      <Card
        className={`${classes.card} ${classes.cardWidth} ${classes.flex} mx-auto`}
      >
        <CardHeader title={journalName} subheader={journalDescription} />
        <CardContent className={classes.flex}>
          <Typography variant="body2">
            {date || ""}, {"  "} {time || ""}
          </Typography>
          <CardActions className={classes.cardActions}>
            <ButtonGroup aria-label="card action buttons">
              <Button
                endIcon={<FontAwesomeIcon icon="folder-open" />}
                component={Link}
                to={"/onlineList/" + journalId}
              >
                {" "}
                Open {"  "}
              </Button>
              <Button
                onClick={props.onEditClick}
                className="btn btn-outline-warning"
              >
                <FontAwesomeIcon icon="edit" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}

const JournalDisplay = connect(
  null,
  mapDispatchToJournalDisplay
)(JournalDisplayConstruct);

export default JournalDisplay;
