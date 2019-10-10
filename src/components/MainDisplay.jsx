import React, { Component } from "react"

import store from "../state_mgmt/store";

import WordBoard from "./WordBoard.jsx";
import SentenceEntry from "./SentenceEntry.jsx";


class MainDisplay extends Component {
  constructor () {
    super();
  }

  render () {
    let currentState = store.getState(),
	boardSents = currentState.board,
	quiverSents = currentState.quiver;
    
    return (
      <div>
	  <div className="mainDisplay">
	      <WordBoard
		id="wordBoard"
		role="board"
		sentences={boardSents} />
	      <WordBoard
		id="wordQuiver"
		role="quiver" 
		sentences={quiverSents} />
	  </div>
	  <SentenceEntry />
      </div>
    );  
  }
}

export default MainDisplay;
