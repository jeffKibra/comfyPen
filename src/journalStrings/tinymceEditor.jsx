import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../component/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import SimplePopper from "../component/popper";
import { Info } from "@material-ui/icons";
import { useStyles } from "../theme/theme";
import PropTypes from "prop-types";
import "tinymce/tinymce";

//skins && theme
import "tinymce/themes/silver/index";
import "tinymce/themes/silver/theme";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/ui/oxide/content.mobile.min.css";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/skin.mobile.min.css";
import "tinymce/skins/content/default/content.css";
import "tinymce/themes/mobile/theme";
//plugins
import "tinymce/plugins/wordcount";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/anchor";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/hr";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/paste";
import "tinymce/plugins/code";
import "tinymce/plugins/help";
import "tinymce/plugins/save";
import "tinymce/plugins/autosave";

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

  const editor = () => (
    <>
      <Editor
        id={journalId}
        init={{
          ...init,
        }}
        initialValue={entry}
        value={getValues("entry")}
        onEditorChange={onEntryChange}
      />
    </>
  );

  const mobileEditor = () => (
    <>
      <Editor
        id={journalId}
        init={{
          ...mobileInit,
        }}
        initialValue={entry}
        value={getValues("entry")}
        onEditorChange={onEntryChange}
      />
    </>
  );
  return (
    <>
      <Grid container justify="center" alignContent="center">
        <Grid
          item
          xs={10}
          sm={9}
          md={7}
          justify="center"
          alignContent="center"
          container
        >
          <TextField
            className={classes.margin}
            label="subject"
            inputRef={register({
              required: { value: true, message: "please provide a subject" },
            })}
            type="text"
            name="subject"
            placeholder="subject"
            helperText={errors.subject?.message}
            error={!!errors.subject?.message}
            defaultValue={subject}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={10}
          sm={9}
          md={7}
          justify="center"
          alignContent="center"
          container
        >
          <FormControlLabel
            control={
              <Switch
                inputProps={{ "aria-label": "mobile mode toggle" }}
                name="mobile"
                onChange={changeView}
                checked={checked}
              />
            }
            label="desktop-mode"
          />
          <SimplePopper
            render={(handleClick) => (
              <Info color="primary" onClick={handleClick} cursor="pointer" />
            )}
          >
            <Typography>
              This setting only works for mobile devices. If you want more power
              in editing, select the desktop mode. It however comes at the cost
              of not being able to paste into the editor. If you want to be able
              to paste, please use the mobile version by disabling the desktop
              mode.
            </Typography>
          </SimplePopper>
        </Grid>
      </Grid>

      <Grid container justify="center" alignContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <div className={classes.margin}>
            {checked && editor()}
            {!checked && mobileEditor()}
            <Typography variant="body2" color="error">
              {errors.entry?.message}
            </Typography>
          </div>
          <Button
            component="button"
            type="submit"
            className={classes.margin}
            aria-controls="save-Button"
            endIcon={<FontAwesomeIcon icon="save" />}
          >
            Save {"  "}
            <Spinner status={status} />
          </Button>
        </Grid>
      </Grid>
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

export default TinymceEditor;
