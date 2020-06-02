import React from "react";
import sanitizeHtml from "sanitize-html";
import { Popconfirm, message } from "antd";

function Modal(props) {
  const { subject, entry } = props.modalData;

  const onEditClick = () => {
    props.onEdit(props.modalData);
  };

  const onDelete = e => {
    console.log(e);
    message.success("click on yes");
    //props.onDelete(props.modalData);
  };

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });

  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };

  const cancel = e => {
    console.log(e);
    message.error("click on no");
  };

  return (
    <div
      className="modal fade"
      id="readModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="popupreadentry"
      aria-hidden="true"
    >
      <div className="modal-dialog " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{subject}</h5>
            <button
              type="button"
              className="text-danger close"
              data-dismiss="modal"
              aria-label="close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">{myComponent()}</div>
          <div className="modal-footer">
            <div className="btn-group">
              <Popconfirm
                title="Are you sure you want to delete this entry?"
                onConfirm={onDelete}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="delete">delete</a>
              </Popconfirm>
              <button
                onClick={onDelete}
                className="btn btn-outline-danger"
                data-dismiss="modal"
              >
                delete
                <i className="fas fa-trash-alt"></i>
              </button>
              <button
                onClick={onEditClick}
                type="button"
                data-toggle="modal"
                data-target="#editorModal"
                className="btn btn-outline-primary"
                data-dismiss="modal"
              >
                edit
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
