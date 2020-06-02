import React, { useState } from "react";
import Spinner from "../component/spinner";
import { Link } from "react-router-dom";

function EmailForm(props) {
  const { email, msg, status, validated, validateEmail } = props;

  const [checked, setChecked] = useState(false);

  const onCheckChange = e => {
    const val = e.target.checked;
    setChecked(val);
  };

  const onChange = e => {
    props.onChange(e);
  };

  const onSubmit = () => {
    props.next();
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">
          <p className=" my-0 py-0 d-inline text-left">
            email: <small className="text-warning ">*{msg}</small>
          </p>
        </label>
        <input
          onChange={onChange}
          type="email"
          name="email"
          value={email}
          className="form-control"
          placeholder="email"
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={onCheckChange}
          checked={checked}
        />
        <label className="form-check-label">
          I have read and agree to the{" "}
          <Link to="/terms" style={{ color: "yellow" }}>
            terms of use
          </Link>{" "}
          and the{" "}
          <Link style={{ color: "yellow" }} to="/privacy">
            {" "}
            privacy policy
          </Link>
        </label>
      </div>

      {validated === true && (
        <button onClick={onSubmit} className="btn btn-outline-warning my-3">
          Continue
        </button>
      )}
      {validated === false && (
        <button
          disabled={!checked}
          onClick={validateEmail}
          className="btn btn-outline-warning my-3"
        >
          Check <Spinner status={status} />
        </button>
      )}
    </div>
  );
}

export default EmailForm;
