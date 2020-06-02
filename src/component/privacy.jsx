import React from "react";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="container">
      <div className="card col-sm-10">
        <div className="card-header">
          <Link className="btn btn-outline-warning" to="/signup">
            back
          </Link>
        </div>
        <div className="card-body">
          <h3> Privacy Statement</h3>

          <p>
            This app, Comfy Pen is committed to the privacy and safeguarding of
            private and confidential information to the extent possible, subject
            to the provisions of the law.
          </p>
          <h3>Data Collected </h3>

          <p>
            This app, Comfy Pen, operates on the basis of signing in a user
            using their email. The email is required for identifying the
            different users who make use of the app and as such one email can be
            used by only one user. The email provided by the user is strictly
            private and will only be used for communicating to the user
            concerning relevant details of their account. The email will not be
            shared to any other party. The user is required to fill a web form
            for registering to the app. Currently, the email received will be
            stored with the application until such a time that their account is
            rendered inactive or the user is in violation of terms of use and
            hence their account gets cancelled. During the use of the app,
            please not that all data from a user is encrypted before storing to
            ensure utmost privacy. The app also collects analytics data through
            google analytics for the purpose tracking the usage of the app. The
            data is collected mainly by third party cookies from google and as
            such can be disabled by disabling third party cookies in your
            browser.
          </p>
          <h3> Change in Privacy Statement.</h3>

          <p>
            This Privacy Statement is the first and was created on 05/29/2020.
            The statement might change in the future for any reason. Please
            ensure your review the Privacy Statement each time you use the app.
            Any significant changes to the privacy policy will be communicated
            to the users using their email.
          </p>
          <h3>Other Sites </h3>
          <p>
            This app may contain links to other external websites operated by
            third parties and hence are not subject to this privacy statement.
            We provide the links for your convenience, but we do not review,
            control or monitor the privacy practices operated by other websites.
            Please ensure you review the privacy policies of third party
            websites as we are not liable to your any business dealings with
            them.
          </p>
          <h3> Queries</h3>
          <p>
            For any questions or comments about this Privacy Policy, please
            contact us using our official email: comfypen@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
