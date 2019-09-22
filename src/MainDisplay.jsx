import React, { Component } from "react";

import WordBoard from "./WordBoard.jsx";

import store from "./store";


class MainDisplay extends Component {
  constructor () {
    super();
  }

  render () {
    let currentState = store.getState(),
	targetWords = currentState.target.words,
	quiverWords = currentState.quiver.words;
    
    return (
      <div className="mainDisplay">
	  <WordBoard
	    id="wordTarget"
	    role="target"
	    words={targetWords} />
	  <WordBoard
	    id="wordQuiver"
	    role="quiver" 
	    words={quiverWords} />
      </div>
    );  
  }
}

export default MainDisplay;
