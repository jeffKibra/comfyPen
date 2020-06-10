import React from "react";
import db from "../component/dbaccess";
import PagesNav from "../navs/pagesNav";
import { connect } from "react-redux";
import { checkKey } from "../component/redux";

const mapStateToPinDiscard = (state) => {
  return state;
};

const mapDispatchToPinDiscard = (dispatch) => ({
  checkKey: (data) => dispatch(checkKey(data)),
});

function PinDiscardConstruct(props) {
  const discard = () => {
    db.pin.clear().then(() => {
      props.checkKey({ storageKey: false });
    });
  };

  return (
    <>
      <nav>
        <PagesNav></PagesNav>
      </nav>
      <div className="container unfixed">
        <div className="card col col-sm-6 col-md-4 col-lg-3 bg-info mx-auto my-3">
          <div className="card-body mx-auto">
            {props.storageKey === true && (
              <>
                <p>Are you sure you want to discard your pin?</p>
                <button className="btn btn-outline-warning" onClick={discard}>
                  Discard
                </button>
              </>
            )}
            {props.storageKey === false && (
              <p>
                Pin discarded. To set another pin, please head over to menu >
                security.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const PinDiscard = connect(
  mapStateToPinDiscard,
  mapDispatchToPinDiscard
)(PinDiscardConstruct);

export default PinDiscard;
