import React from "react";

import store from "./store";

import { wordToBoard } from "./actions";


class WordTile extends React.Component {
  constructor () {
    super();
  }

  move () {
    store.dispatch(wordToBoard(this.props.idx));
  }

  render () {
    return (
      <div className="aWord"
	   onClick={this.move.bind(this)}>
	  <h1>{this.props.word}</h1>
      </div>
    );
  }
}

export default WordTile
