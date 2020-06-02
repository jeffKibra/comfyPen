import React, { Component } from "react";
import { uuid } from "uuidv4";
import { Link } from "react-router-dom";
import Fetcher from "../component/server";
import { validateEmail } from "../component/validator";
import { Steps } from "antd";
import logo from "../diary144.png";
import EmailForm from "./emailForm";
import PasswordForm from "./passwordForm";
import Nav from "../navs/myNav";
import SnackBar from "../component/snackBar";
import $ from "jquery";

const { Step } = Steps;

class Signup extends Component {
  state = {
    current: 0,
    validated: false,
    status: false,
    finish: false,
    msg: "",
    email: "",
    steps: [
      { title: "Email", content: "Confirm Email" },
      { title: "Password", content: "Type in your Password" },
      { title: "msg", content: "Account msgfully created!" },
    ],
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  onChange = (e) => {
    const email = e.target.value;
    const msg = validateEmail(email);
    if (msg !== "") this.setState({ validated: false });
    this.setState({ email, msg, validated: false });
  };

  validateEmail = () => {
    const email = this.state.email;
    const msg = validateEmail(email);
    if (msg === "") {
      const emailData = { email, submit: "EMAIL" };
      this.setState({ status: true });
      Fetcher(emailData, "POST")
        .then((res) => {
          //console.log(res);
          this.setState({ status: false });
          if (res.value === true) {
            this.setState({
              validated: false,
              msg: "This email is already registered",
            });
          } else if (res.value === false) {
            this.setState({
              validated: true,
              msg: "Email Available",
            });
          } else {
            this.setState({
              validated: false,
              msg: res.value,
            });
          }
        })
        .catch((err) => {
          this.setState({
            status: false,
            validated: false,
            msg: "Please ensure you have an internet connection!",
          });

          //console.log(err);
        });
    } else {
      this.setState({ msg });
      $("#snackBarTrigger").trigger("click");
    }
  };

  onFormSubmit = (formData) => {
    this.setState({
      status: true,
      msg: "",
    });

    // console.log(!!this.state.email);
    //if (!!this.state.email) this.setState({ confirmEmail: false });
    const signupData = {
      ...formData,
      email: this.state.email,
      id: uuid(),
      submit: "SIGNUP",
    };

    //console.log(signupData);
    Fetcher(signupData, "POST")
      .then((response) => {
        //console.log(response);
        if (response.value) {
          this.setState({
            status: false,
            msg: "Account successfully created. Login to proceed!",
            email: "",
            finish: true,
          });
          this.next();
        } else {
          this.setState({
            status: false,
            msg:
              "Please choose another email! This email already has an account!",
            email: "",
            finish: false,
          });
        }

        //console.log(response);
      })
      .catch((err) => {
        this.setState({
          status: false,
          email: "",
          finish: false,
          msg: "Please ensure you have an internet connection!",
        });
        //console.log(err);
      });
  };

  render() {
    const {
      current,
      steps,
      status,
      msg,
      validated,
      email,
      finish,
    } = this.state;

    return (
      <>
        <nav>
          <Nav />
        </nav>

        <div className="container unfixed">
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>

          <div className="card col-sm-9 col-md-7 col-lg-6 my-3 mx-auto bg-info text-white">
            <div className="card-body">
              <img
                src={logo}
                className=" img-fluid mx-auto d-block card-img-top text-center"
                style={{ width: "20%", height: "auto" }}
                alt="ComfyPen logo"
              />
              <div>
                {current === 0 && (
                  <EmailForm
                    email={email}
                    next={this.next}
                    prev={this.prev}
                    validated={validated}
                    status={status}
                    msg={msg}
                    onChange={this.onChange}
                    validateEmail={this.validateEmail}
                  />
                )}
              </div>
              <div>
                {current === 1 && (
                  <PasswordForm
                    finish={finish}
                    next={this.next}
                    prev={this.prev}
                    status={status}
                    msg={msg}
                    submitForm={this.onFormSubmit}
                  />
                )}
              </div>
              <div>
                {current === 2 && (
                  <div>
                    <p className="text-center text-warning">
                      Proceed to Login!
                    </p>
                    <Link to="/login" className="btn btn-outline-warning">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <SnackBar msg={msg} />
        </div>
      </>
    );
  }
}

export default Signup;
