import React from "react";

import WordBoard from "./WordBoard.jsx";
import SentenceEntry from "./SentenceEntry.jsx";


const MainDisplay = () => {
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
    
export default MainDisplay;
