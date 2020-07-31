import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";
import logo from "../diary144.png";

function LoginComponent(props) {
  const { status, handleFormSubmit } = props;

  return (
    <>
      <div className="card col-sm-6 col-md-4 mx-auto bg-light ">
        <div className="card-body">
          <h3 className="card-title">Login</h3>
          <img
            src={logo}
            className=" img-fluid mx-auto d-block card-img-top text-center"
            style={{ width: "20%", height: "auto" }}
            alt="ComfyPen logo"
          />

          <LoginForm status={status} onFormSubmit={handleFormSubmit} />

          <div className="text-center my-2 mx-auto">
            {/*<Link to="/resetPassword">Forgot password?</Link>{" "}*/}
            <p className="my-3">
              Don't have an account? {"  "}
              <Link to="/signup">signup...</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
