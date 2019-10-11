import _ from "lodash";
import React, { Component } from "react"

import WordBoard from "./WordBoard.jsx";
import SentenceEntry from "./SentenceEntry.jsx";


class MainDisplay extends Component {
  constructor () {
    super();
  }

  render () {
    console.log(this.props);

    return (
      <div>
	  <div className="mainDisplay">
	      <WordBoard
		id="wordBoard"
		role="target" />
	      <WordBoard
		id="wordQuiver"
		role="quiver" />
	  </div>
	  <SentenceEntry />
      </div>
    );
  }
}
    
export default MainDisplay;
