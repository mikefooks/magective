import _ from "lodash"

import React, { Component } from "react";
import WordDisplay from "./WordDisplay.jsx";


class WordQuiver extends Component {
  generateWordDisplays () {
    return this.props.words.map((word, idx) => {
      return <WordDisplay word={word} key={idx} />
    });
  }

  render () {
    return (
      <div className="wordQuiver">
	  {this.generateWordDisplays()}
      </div>
    );
  }
}

class WordBoard extends Component {
  render () {
    return (
      <div className="wordBoard">	  
      </div>
    );
  }
}

class MainDisplay extends Component {
  constructor () {
    super();

    this.state = {
      words: 'this is really actually pretty dope'.split(' ')
    };
  }

  render () {
    let shuffledWords = _.shuffle(this.state.words);
    
    return (
      <div className="mainDisplay">
	  <WordBoard />
	  <WordQuiver words={shuffledWords} />
      </div>
    );  
  }
}

export default MainDisplay;
