import React from "react";
import { applyTheme } from "./themeRedux";
import { connect } from "react-redux";
import ThemeTypeComponent from "./themeTypeComponent";
import PropTypes from "prop-types";

const mapStateToProps = (state) => {
  const { profile } = state.firebase;
  return { profile };
};

const mapDispatchToProps = (dispatch) => ({
  applyTheme: (theme) => dispatch(applyTheme(theme)),
});

function ThemeType(props) {
  //console.log(props);
  const { profile, applyTheme } = props;
  const darkMode = profile.theme?.darkMode;
  const toggleTheme = () => {
    const theme = profile.theme;
    const newTheme = {
      ...theme,
      darkMode: !theme?.darkMode,
    };
    //console.log(profile);
    applyTheme({ theme: newTheme });
  };

  return <ThemeTypeComponent toggleTheme={toggleTheme} darkMode={darkMode} />;
}

ThemeType.propTypes = {
  applyTheme: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeType);
