import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <div style={{ marginTop: 200 }}></div>
      <div className="bg-dark footer text-center">
        <small>
          copyright &copy; 2020 |{" "}
          <a href="https://finitecreations.co.ke">finitecreations</a>
        </small>
      </div>
    </React.Fragment>
  );
};

export default Footer;
