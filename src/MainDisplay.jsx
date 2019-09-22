import React, { Component } from "react";
import { createStore } from "redux";

import WordBoard from "./WordBoard.jsx";
import { bootstrap } from "./reducers";

const store = createStore(bootstrap);


class MainDisplay extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="mainDisplay">
	  <WordBoard
	    id="wordTarget"
	    role="target"
	    words={store.target.words} />
	  <WordBoard
	    id="wordQuiver"
	    role="quiver" 
	    words={store.quiver.words} />
      </div>
    );  
  }
}

export default MainDisplay;
