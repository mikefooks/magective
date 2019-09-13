import _ from "lodash"

import React, { Component } from "react";
import WordDisplay from "./WordDisplay.jsx";


class MainDisplay extends Component {
    constructor () {
	super();

	this.state = {
	    words: 'this is really actually pretty dope'.split(' ')
	};
    }

    _randoPick () {
	let rando = Math.random(),
	    wordsLen = this.state.words.length,
	    wordIdx = Math.floor(rando * wordsLen);

	return this.state.words[wordIdx];
    }

    render () {
	let thePick = this._randoPick();
	
	return (
	    <div className="mainDisplay">
		<WordDisplay word={thePick} />
	    </div>
	);  
    }
}


export default MainDisplay;

