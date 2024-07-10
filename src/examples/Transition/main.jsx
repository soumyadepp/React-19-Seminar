import React from "react";
import { Transition } from "./Transition";

export const TransitionExample = () => {
  return (
    <div className="screen">
      <h1>UseTransition Hook</h1>
      <div>
        <h2 className="subheader">How does this work?</h2>
        <p className="para-text">
          The async transition will immediately set the isPending state to true,
          make the async request(s), and switch isPending to false after any
          transitions. This allows you to keep the current UI responsive and
          interactive while the data is changing.
        </p>
      </div>
      <h3 className="subheader">Using useTransition hook</h3>
      <Transition />
    </div>
  );
};
