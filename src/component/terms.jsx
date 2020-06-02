import React from "react";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="container">
      <div className="card col-sm-10">
        <div className="card-header">
          <Link className="btn btn-outline-warning" to="/signup">back</Link>
        </div>
        <div className="card-body">
          <h3>Terms of Use</h3>
          <p>
            By using this app, Comfy Pen, you are agreeing entirely to the terms
            of use stated herein concerning the use and limitations of the app. 
          </p>
          <h3>Usage</h3>
          <p>
            This app is free to use to an extent upon which future updates and
            upgrades might see an introduction of premium options that may
            require the user to pay to use those services/features. 
            <br />
            For access to the free features, the user must have an account with
            the app to gain access.
          </p>
          <h3>Prohibited Uses</h3>
          <p>
            This app is the property of Finite Creations and as such any
            leasing, copying, sublicensing, transferring or assigning the app or
            any information in the app. prohibited. Use for any illegal
            purposes. <br />
            Altering, modifying, adapting, reverse engineering, decompiling,
            disassembling or any attempt to hack this app. <br />
            Any website is prohibited to imply that it has an association with
            this app. <br />
            Violating a other users legal and privacy rights. <br />
            Using the app to save or transmit any content that could be deemed
            unlawful, threatening, harrassing, racist, abusive, libelous,
            pornographic, vulgar, defarmatory, obscene, indecent, or otherwise
            inappropriate. <br />
            Breaching or attempting to breach, the app's security systems.{" "}
            <br />
            Enabling third parties to violate the terms of use. <br />
            All users of this web application must be at least 18 years of age
            or older. <br />
          </p>
          <h3>Service Interruptions and Updates</h3>
          <p>
            Any service interuptions will be communicated to the users via their
            email addresses. In case of any service issues, please contact the
            service provider at comfypen@gmail.com.
          </p>
          <h3>Term, Termination and Survival</h3>
          <p>
            This Agreement shall be effective as of the date the User accepts
            the terms herein or first accesses the Services on this app and
            shall remain in effect for as long as the User uses any of the
            services in the application. 
          </p>
          <h3>User Data</h3>
          <p>
            The User should use the app for purposes of which comply to the law
            and failure to which the company will not be liable to the User's
            missuse of their data. The app has the right to revoke or restrict
            the users access to the services offered in the event the User the
            Terms of Use or any applicable law.
          </p>
          <h3>Confidentials Information</h3>
          <p>
            All the information provided by the application including the users
            data is private and confidentials and should be treated as such.
            Indemnification and Limitation of Liability In the event that the
            user violates oany of the Terms of Use or applicable laws, the app
            will not be responsible whatsoever for any loss or damage on the
            side of the user.
          </p>
          <h3>Amendments</h3>

          <p>
            Any amendments to the Terms of Use will be communicated via email to
            the User.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
