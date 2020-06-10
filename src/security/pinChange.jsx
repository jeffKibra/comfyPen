import React, { Component } from "react";
import PinForm from "./pinForm";
import PinSignup from "./pinSignup";
import db from "../component/dbaccess";
import PagesNav from "../navs/pagesNav";

class PinChange extends Component {
  state = {
    current: 0,
  };

  next = (data) => {
    const current = this.state.current + 1;
    db.pin
      .where("pin")
      .equals(data.pin)
      .count()
      .then((val) => {
        if (val === 0) {
          alert("invalid pin");
        } else {
          db.pin.clear();
          this.setState({ current });
        }
      });
  };

  render() {
    const { current } = this.state;

    return (
      <>
        <nav>
          <PagesNav></PagesNav>
        </nav>
        <>
          {current === 0 && (
            <>
              <PinForm next={this.next} />
            </>
          )}
          {current === 1 && (
            <>
              <PinSignup />
            </>
          )}
        </>
      </>
    );
  }
}

export default PinChange;
