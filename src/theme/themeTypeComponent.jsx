import React from "react";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function ThemeTypeComponent(props) {
  const { toggleTheme, darkMode } = props;
  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      aria-label="theme type toggler"
    >
      <FontAwesomeIcon icon={darkMode ? "sun" : "moon"} />
    </IconButton>
  );
}

ThemeTypeComponent.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
