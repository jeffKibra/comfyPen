import React from "react";
import sanitizeHtml from "sanitize-html";
import * as moment from "moment";
import MoreMenu from "./moreMenu";

function ReadFinal(props) {
  const { subject, entry, createdAt } = props.entry;

  const createMarkup = () => ({ __html: sanitizeHtml(entry) });

  const myComponent = () => {
    return <div dangerouslySetInnerHTML={createMarkup()}></div>;
  };
  const date = moment(createdAt).format("LL");
  const time = moment(createdAt).format("LTS");

  return (
    <div>
      <div className="card" style={{ minHeight: "80vh" }}>
        <div className="card-header row">
          <div>
            <h5 className="card-title">{subject}</h5>
            <small>
              {date}
              {"  "} : {"  "}
              {time}
            </small>
          </div>
          <div className="ml-auto">
            <MoreMenu {...props} />
          </div>{" "}
        </div>

        <div className="card-body">{myComponent()}</div>
      </div>
    </div>
  );
}

export default ReadFinal;
