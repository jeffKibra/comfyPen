import React from "react";
import { Link } from "react-router-dom";

export default function Cards(props) {
  const { name, description, path } = props.card;
  return (
    <div className="row">
      <div className=" col-12  text-center">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <p>{description}</p>
          <Link
            to={path}
            className="btn btn-outline-warning"
            disabled={props.disabled}
          >
            {name}
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}
