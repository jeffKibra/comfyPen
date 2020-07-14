import React from "react";
import JournalForm from "./journalForm";
import SnackBar from "../component/snackBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../component/spinner";
import PropTypes from "prop-types";

function CreateJournalComponent(props) {
  const {
    isOpen,
    allowed,
    onFormOpen,
    onFormClose,
    onFormSubmit,
    status,
  } = props;
  return (
    <>
      {isOpen === true ? (
        <div className="card col-sm-9 col-md-7 col-lg-6 bg-info mx-auto my-3">
          <div className="card-body">
            <>
              {allowed === true ? (
                <JournalForm
                  journalName=""
                  journalDescription=""
                  onFormSubmit={onFormSubmit}
                  onFormClose={onFormClose}
                  btnText="Create"
                />
              ) : (
                <p>Only allowed for premium users!</p>
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="mx-auto">
          <button
            onClick={onFormOpen}
            className="btn btn-outline-info mx-auto my-4"
          >
            new Journal{" "}
            {status === true ? (
              <Spinner status={status} />
            ) : (
              <FontAwesomeIcon icon="plus" />
            )}
          </button>
        </div>
      )}

      <SnackBar />
    </>
  );
}

CreateJournalComponent.propTypes = {
  status: PropTypes.bool.isRequired,
  onFormOpen: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  allowed: PropTypes.bool.isRequired,
};

export default CreateJournalComponent;
