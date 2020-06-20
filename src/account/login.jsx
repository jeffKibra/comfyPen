import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "./loginForm";
import { connect } from "react-redux";
import logo from "../diary144.png";
import { loginAsync } from "./authRedux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  loginAsync: (data) => dispatch(loginAsync(data)),
});

function Login(props) {
  const history = useHistory();
  const handleFormSubmit = (formData) => {
    props.loginAsync(formData);
  };

  useEffect(() => {
    const { uid } = props.firebase.auth;
    if (uid) history.push("/account");
  }, [props.firebase.auth, history]);

  const status = props.custom.loading;
  const msg = props.custom.msg;
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

          <LoginForm
            msg={msg}
            status={status}
            onFormSubmit={handleFormSubmit}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
