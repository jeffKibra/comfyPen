import React from "react";
import { GoogleOutlined } from "@ant-design/icons";

export default function Google({ text, msg }) {
  const googleAuthenticate = () => {
    fetch("/auth/google", {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-info col text-center col-sm-6 col-md-4 mx-auto my-3">
      <div className="card-body">
        <small className="text-light">Or</small>

        <p className="text-light">{msg}</p>
        <button
          onClick={googleAuthenticate}
          className="btn btn-lg btn-outline-warning myBtn mx-auto"
        >
          {text} {"  "}
          <GoogleOutlined />
        </button>
      </div>
    </div>
  );
}
