/* src/components/RandomText.jsx */
/* @flow */

import React from 'react';

type Props = {
  randomText: string,
  generateText: ()=> void,
}

/* Display random example text string based on outside forms inputs */
const RandomText = (props: Props) => {
  return (
    <div>
      <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
      <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
      <hr />
      <div className="row">
        {/* Example randomly generated SMS text using form fields */}
        <h6>
          <strong id="subheadline">Example Random Text : </strong> {props.randomText}
        </h6>
        <button className="btn input" onClick={props.generateText}>GENERATE</button>
      </div>
      <hr />
    </div>
  );
};

export default RandomText;
