import React, { useState, useEffect } from "react";
import { useStyles } from "./theme";
import ColorSelectorComponent from "./colorSelectorComponent";

export default function ColorSelector(props) {
  const { title, body, toggler, save, toggleState, initialColor } = props;

  const [color, setColor] = useState(initialColor);

  const onChangeComplete = (color) => {
    //console.log(color);
    setColor(color.hex);
  };

  const saveColor = () => {
    //console.log(color);
    save(color);
  };

  const reset = () => {
    save("");
  };

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const classes = useStyles({ color });
  return (
    <>
      <ColorSelectorComponent
        title={title}
        body={body}
        toggler={toggler}
        toggleState={toggleState}
        classes={classes}
        saveColor={saveColor}
        onChangeComplete={onChangeComplete}
        reset={reset}
        color={color}
      />
    </>
  );
}
