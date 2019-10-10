import React from "react";

import store from "../state_mgmt/store";

import { wordToBoard, wordToQuiver } from "../state_mgmt/actions";


class WordTile extends React.Component {
  constructor () {
    super();
  }

  move () {
    if (this.props.role == "quiver") {
      store.dispatch(wordToBoard(this.props.idx));
    } else if (this.props.role == "board") {
      store.dispatch(wordToQuiver(this.props.idx));
    }
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
