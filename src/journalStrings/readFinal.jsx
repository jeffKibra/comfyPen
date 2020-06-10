import React from "react";
import sanitizeHtml from "sanitize-html";
import { connect } from "react-redux";
import * as moment from "moment";

const mapStateToReadFinal = (state) => {
  return state;
};

function ReadFinalConstruct(props) {
  const { activeEntry } = props;
  const { subject, entry, createdAt } = activeEntry;

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });

  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };

  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <div>
      <div className="container">
        <div className="card unfixed" style={{ minHeight: "80vh" }}>
          <div className="card-header">
            <h5 className="card-title">{subject}</h5>
            <div className="ml-auto">
              <small>
                {date}
                {"  "} : {"  "}
                {time}
              </small>
            </div>
          </div>

          <div className="card-body">{myComponent()}</div>
        </div>
      </div>
    </div>
  );
}

const ReadFinal = connect(mapStateToReadFinal)(ReadFinalConstruct);

export default ReadFinal;
