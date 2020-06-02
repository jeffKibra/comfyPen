import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";
import db from "../component/dbaccess";
import { connect } from "react-redux";
import { isLogged } from "../component/redux";
import Fetcher from "../component/server";
import Nav from "../navs/myNav";
import SnackBar from "../component/snackBar";
import $ from "jquery";
import logo from "../diary144.png";

const mapStateToLogin = (state) => ({
  logged: state.logged,
});
const mapDispatchToLogin = (dispatch) => ({
  isLogged: (data) => dispatch(isLogged(data)),
});

class LoginConstruct extends Component {
  state = {
    status: false,
    msg: "",
    email: "",
  };

  componentDidMount() {
    db.users.count().then((val) => {
      if (val === 0) {
        this.props.isLogged({ logged: false });
      } else {
        db.users.toArray().then((val) => {
          console.log(val);
          if (val[0].accessToken === "") {
            this.props.isLogged({ logged: false });
          } else {
            this.setState({ email: val[0]?.email });
            this.props.isLogged({ logged: true });
          }
        });
      }
    });
  }

  handleFormSubmit = (formData) => {
    this.setState({ status: true });

    const loginData = { ...formData, submit: "LOGIN" };
    //console.log(loginData);
    Fetcher(loginData, "POST")
      .then((res) => {
        this.setState({ status: false });
        //console.log(res);
        if (res.value === false) {
          this.setState({
            msg: "Invalid username or password!",
          });
          $("#snackBarTrigger").trigger("click");
        } else {
          this.setState({
            msg: "Login Successful!",
          });
          $("#snackBarTrigger").trigger("click");
          db.users.clear().then(() => {
            db.users.add(res).then(() => {
              this.props.isLogged({ logged: true });
              db.users.toArray().then((val) => {
                this.setState({ email: val[0].email });
              });
            });
          });
        }
      })
      .catch((err) => {
        this.setState({
          status: false,
          msg: "Invalid username or password!",
        });
        $("#snackBarTrigger").trigger("click");
        //console.log(err);
      });
  };

  render() {
    const { msg, status, email } = this.state;

    return (
      <>
        <nav>
          <Nav />
        </nav>
        <div className="container unfixed">
          <div className="card col-sm-6 col-md-4 mx-auto bg-info text-white ">
            <div className="card-body">
              <h3 className="card-title">Login</h3>
              <img
                src={logo}
                className=" img-fluid mx-auto d-block card-img-top text-center"
                style={{ width: "20%", height: "auto" }}
                alt="ComfyPen logo"
              />

              {this.props.logged === true && (
                <>
                  <p className="card-text">
                    Logged in with email : {email} ...
                  </p>
                  <Link to="/" className="btn btn-outline-warning">
                    Resume
                  </Link>
                </>
              )}
              {this.props.logged === false && (
                <LoginForm
                  status={status}
                  onFormSubmit={this.handleFormSubmit}
                />
              )}
              <p>
                Don't have an account? {"  "}
                <Link to="/signup" className="btn btn-sm btn-warning">
                  signup
                </Link>
              </p>
            </div>
          </div>
          <SnackBar msg={msg} />
        </div>
      </>
    );
  }
}

const Login = connect(mapStateToLogin, mapDispatchToLogin)(LoginConstruct);

export default Login;
