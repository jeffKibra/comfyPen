import React, { useEffect, useState } from "react";
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";
import TinyComponent from "./tinyComponent";
import Spinner from "../component/spinner";
import FormHOC from "../component/formHOC";

function TinymceEditor(props) {
  //console.log(props);
  const classes = useStyles();
  const {
    status,
    subject,
    entry,
    register,
    errors,
    setValue,
    journalId,
    getValues,
  } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    //console.log(register);
    register("entry", {
      required: { value: true, message: "entry field cannot be empty" },
    });
  }, [register]);

  useEffect(() => {
    setValue("entry", entry);
  }, [entry, setValue]);

  const onEntryChange = (content) => {
    //props.onEntryChange(content);
    //console.log(content);
    setValue("entry", content);
  };

  const changeView = (e) => {
    setChecked(e.target.checked);
  };

  const plugins = [
    "advlist autolink lists link image charmap print preview hr",
    "pagebreak spellchecker nonbreaking anchor",
    "table emoticons template wordcount",
    "searchreplace visualblocks visualchars fullscreen",
    "insertdatetime media paste code help save autosave",
  ];
  const toolbar =
    "undo redo | restoredraft insertdatetime | formatselect | bold italic forecolor backcolor | hr pagebreak nonbreaking table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons charmap removeformat | searchreplace fullscreen preview print | help";
  const mobile = {
    menubar: true,
  };
  const init = {
    height: "500",
    placeholder: "type here...",
    plugins: plugins,
    menu: {
      favs: {
        title: "myFavorite",
        items: "emoticons spellchecker",
      },
    },
    toolbar: toolbar,
    menubar: "fav file edit view insert format",
    mobile: mobile,
    //content_css: "tinymce/skins/content/writer/content.css",
    autosave_restore_when_empty: true,
  };
  const mobileInit = {
    ...init,
    mobile: {
      ...mobile,
      theme: "mobile",
    },
  };
  const journalIdStatus = !!journalId;

  return (
    <>
      {journalIdStatus && (
        <TinyComponent
          register={register}
          entry={entry}
          journalId={journalId}
          getValues={getValues}
          status={status}
          subject={subject}
          classes={classes}
          errors={errors}
          checked={checked}
          changeView={changeView}
          onEntryChange={onEntryChange}
          mobileInit={mobileInit}
          init={init}
        />
      )}
      <Spinner status={!journalIdStatus} />
    </>
  );
}

TinymceEditor.propTypes = {
  subject: PropTypes.string.isRequired,
  entry: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  journalId: PropTypes.string.isRequired,
};

export default FormHOC(TinymceEditor);
