import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../component/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Diary(props) {
  const { subjectError, disabled, onSubmit, subject, entry, status } = props;

  const onEntryChange = (content) => {
    props.onEntryChange(content);
  };

  const onSubjectChange = (e) => {
    props.onSubjectChange(e);
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="subject">
          <p className=" my-0 py-0 d-inline text-left">
            subject: <small className="text-danger ">*{subjectError}</small>
          </p>
        </label>
        <input
          onChange={onSubjectChange}
          type="text"
          value={subject}
          name="subject"
          className="form-control "
          placeholder="subject"
        />
      </div>

      <Editor
        init={{
          height: "50vh",
          placeholder: "type here...",
          plugins: [
            "advlist autolink lists link image charmap print preview hr",
            "pagebreak spellchecker media nonbreaking anchor",
            "table emoticons template wordcount",
            "searchreplace visualblocks visualchars code fullscreen",
            "insertdatetime media  paste code help",
          ],
          menu: {
            favs: { title: "myFavorite", items: "emoticons spellchecker" },
          },
          toolbar:
            "undo redo | insertdatetime | formatselect | bold italic forecolor backcolor | hr pagebreak nonbreaking searchreplace table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons removeformat | help",
          menubar: "fav file edit view insert format",
          content_css: "tinymce/skins/content/writer/content.css",
          //entity_encoding: "named"
        }}
        value={entry}
        onEditorChange={onEntryChange}
      />

      <div className="btn-group">
        <button
          className="btn btn-outline-primary my-2"
          onClick={onSubmit}
          aria-controls="save-button"
          disabled={disabled}
        >
          Save {"  "}
          <FontAwesomeIcon icon="save" /> {"  "}
          <Spinner status={status} />
        </button>
      </div>
    </div>
  );
}

export default Diary;
