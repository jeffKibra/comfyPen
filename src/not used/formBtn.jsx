import React from "react";

function Spinner(props) {
  if (props.online) {
    return (
      <span role="status" className="spinner-border spinner-border-sm "></span>
    );
  } else {
    return "";
  }
}

function Button(props) {
  const { btnText, online, signupMsg } = props;
  return (
    <div>
      <button className="btn btn-outline-primary">
        {btnText}
        <Spinner online={online} />
      </button>
      <p>{signupMsg}</p>
    </div>
  );
}

export default Button;
