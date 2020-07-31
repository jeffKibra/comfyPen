import React, { useEffect } from "react";
import { connect } from "react-redux";
import db from "../component/dbaccess";
import { checkKey } from "../component/redux";
import SecurityComponent from "./securityComponent";
import Cards from "./cards";
import { useStyles } from "../theme/theme";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

const pins = [
  {
    name: "set pin",
    description: "Create a pin to safeguard your entries",
    path: "/setPin",
  },
  {
    name: "change pin",
    description: "change your pin",
    path: "/changePin",
  },
  {
    name: "discard pin",
    description:
      "Discard your pin! Please note that your journals will be viewed by anybody",
    path: "/discardPin",
  },
  {
    name: "Forgot pin",
    description:
      "Forgot your pin! Please note that you will have to login again!",
    path: "/account",
  },
];

function Security(props) {
  const classes = useStyles();

  const { checkKey, custom } = props;

  useEffect(() => {
    db.pin.count().then((val) => {
      if (val === 0) {
        checkKey({ storageKey: false });
      } else {
        checkKey({ storageKey: true });
      }
    });
  }, [checkKey]);

  const { storageKey } = custom;
  //console.log(props);
  const isSet = pins.filter((card) => card.name !== "set pin");
  const notSet = pins.filter((card) => card.name === "set pin");

  const isSetCards = isSet.map((pin, index) => {
    return <Cards key={index} card={pin} />;
  });
  const notSetCards = notSet.map((pin, index) => {
    return <Cards key={index} card={pin} />;
  });

  return (
    <>
      <SecurityComponent
        storageKey={storageKey}
        isSetCards={isSetCards}
        notSetCards={notSetCards}
        classes={classes}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Security);
