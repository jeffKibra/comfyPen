import React from "react";
import JournalDisplay from "./journalDisplay";
import UpdateJournal from "./updateJournal";

function EditableComponent(props) {
  const { journal, editFormOpen } = props;
  const onEditClick = () => {
    props.openForm();
  };

  const onFormClose = () => {
    props.closeForm();
  };

  const onTrashClick = () => {
    props.onJournalDelete(journal.journalid);
  };

  if (editFormOpen) {
    return (
      <div className="card col-sm-9 col-md-7 col-lg-6 mx-auto bg-info">
        <div className="card-body">
          <UpdateJournal journal={journal} refreshJournal={props.refreshJournal} onFormClose={onFormClose} />
        </div>
      </div>
    );
  } else {
    return (
      <JournalDisplay
        journal={journal}
        onEditClick={onEditClick}
        onTrashClick={onTrashClick}
      />
    );
  }
}

export default EditableComponent;
