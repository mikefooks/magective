import React from "react";

import { moveWord } from "./reducers";


class WordTile extends React.Component {
  constructor () {
    super();
  }

  clickHandler () {
    console.log("boogers.");
  }

  render () {
    return (
      <div className="aWord"
	   onClick={this.clickHandler}>
	  <h1>{this.props.word}</h1>
      </div>
    );
  }
}

export default WordTile
