import React from "react";
import sanitizeHtml from "sanitize-html";
import { message } from "antd";
import EntryNav from "../navs/entryNav";
import { onEdit, onView } from "../component/redux";
import { connect } from "react-redux";

const mapDispatchToRead = dispatch => ({
  onEdit: data => dispatch(onEdit(data)),
  onView: () => dispatch(onView())
});

const mapStateToRead = state => {
  const { readerData } = state;
  return { readerData };
};

function ReadConstruct(props) {
  const { status } = props;
  const { subject, entry, date, time } = props.readerData;

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });

  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };

  const onEditClick = () => {
    props.onEdit(props.readerData);
  };

  const onDelete = e => {
    message.success("Deleting...");
    props.onDelete(props.readerData);
  };

  const cancel = e => {
    message.error("Cancelled");
  };

  return (
    <div>
      <nav>
        <EntryNav
          status={status}
          onEditClick={onEditClick}
          onDelete={onDelete}
          cancel={cancel}
          onView={props.onView}
        />
      </nav>

      <div className="container">
        <div className="card unfixed" style={{ minHeight: "80vh" }}>
          <div className="card-header">
            <h5 className="card-title">{subject}</h5>
            <div className="ml-auto">
              <small>
                {date}
                {"  "} : {"  "}
                {time}
              </small>
            </div>
          </div>

          <div className="card-body">{myComponent()}</div>
        </div>
      </div>
    </div>
  );
}

const Read = connect(mapStateToRead, mapDispatchToRead)(ReadConstruct);

export default Read;
