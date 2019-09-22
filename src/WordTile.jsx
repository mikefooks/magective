import React from "react";

import { moveWord } from "./reducers";


class WordTile extends React.Component {
  constructor () {
    super();
  }

  move ()

  render () {
    return (
      <div className="aWord"
	   key={this.props.key}
	   onClick={this.clickHandler}>
	  <h1>{this.props.word}</h1>
      </div>
    );
  }
}

export default WordTile
