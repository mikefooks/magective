import React, { Component } from "react"

import store from "./store";

import WordBoard from "./WordBoard.jsx";


class MainDisplay extends Component {
  constructor () {
    super();
  }

  render () {
    let currentState = store.getState(),
	boardWords = currentState.board.words,
	quiverWords = currentState.quiver.words;
    
    return (
      <div className="mainDisplay">
	  <WordBoard
	    id="wordBoard"
	    role="board"
	    words={boardWords} />
	  <WordBoard
	    id="wordQuiver"
	    role="quiver" 
	    words={quiverWords} />
      </div>
    );  
  }
}

export default MainDisplay;
