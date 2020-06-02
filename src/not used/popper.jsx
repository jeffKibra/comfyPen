import React, { Component } from "react";
//import { createPopper } from "@popperjs/core";
import { usePopper } from "react-popper";
//import $ from "jquery";

const Popping = () => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    placement: "left"
  });

  return (
    <div>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
};

export default Popping;
