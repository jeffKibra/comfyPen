import React, { useState, useEffect } from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import ThemeColorComponent from "./themeColorComponent";
import { applyTheme } from "./themeRedux";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { profile } = state.firebase;
  return { profile };
};

const mapDispatchToProps = (dispatch) => ({
  applyTheme: (theme) => dispatch(applyTheme(theme)),
});

function ThemeColor(props) {
  const { primary, secondary } = props.theme.palette;
  const profile = props.profile;

  const [state, setState] = useState({
    primaryColor: "",
    secondaryColor: "",
    primaryToggleState: false,
    secondaryToggleState: false,
  });

  useEffect(() => {
    setState((state) => {
      //console.log(state);
      return {
        ...state,
        primaryColor: primary.main,
        secondaryColor: secondary.main,
      };
    });
  }, [primary.main, secondary.main]);

  const savePrimaryColor = (color) => {
    //console.log(color);
    setState({
      ...state,
      primaryColor: color,
      primaryToggleState: !state.primaryToggleState,
    });
  };

  const saveSecondaryColor = (color) => {
    setState({
      ...state,
      secondaryColor: color,
      secondaryToggleState: !state.secondaryToggleState,
    });
  };

  const togglePrimarySelector = () => {
    const { primaryToggleState, secondaryToggleState } = state;
    setState({
      ...state,
      primaryToggleState: !primaryToggleState,
      secondaryToggleState: !primaryToggleState
        ? secondaryToggleState
          ? !secondaryToggleState
          : secondaryToggleState
        : secondaryToggleState,
    });
  };

  const toggleSecondarySelector = () => {
    const { primaryToggleState, secondaryToggleState } = state;

    setState({
      ...state,
      secondaryToggleState: !secondaryToggleState,
      primaryToggleState: !secondaryToggleState
        ? primaryToggleState
          ? !primaryToggleState
          : primaryToggleState
        : primaryToggleState,
    });
  };

  const applyChanges = () => {
    //console.log(state);
    const theme = profile.theme;
    const { primaryColor, secondaryColor } = state;
    props.applyTheme({
      theme: { ...theme, primary: primaryColor, secondary: secondaryColor },
    });
  };

  const { primaryColor, secondaryColor } = state;
  return (
    <>
      <ThemeColorComponent
        savePrimaryColor={savePrimaryColor}
        saveSecondaryColor={saveSecondaryColor}
        togglePrimarySelector={togglePrimarySelector}
        toggleSecondarySelector={toggleSecondarySelector}
        applyChanges={applyChanges}
        primaryToggleState={state.primaryToggleState}
        secondaryToggleState={state.secondaryToggleState}
        primary={primaryColor}
        secondary={secondaryColor}
      />
    </>
  );
}

export default compose(
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(ThemeColor);
