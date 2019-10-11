import React from "react";

import WordTile from "./WordTile.jsx";


let wordCounter = 0;

class SentenceTile extends React.Component {
  constructor () {
    super();
  }

  render () {
    let wordList = this.props.sentence.getTokens(),
	tiles = _.map(wordList, word => {
	  return <WordTile key={wordCounter++} word={word.word} />
	});
  
    return (
      <div className="sentenceTile">
	  {tiles}
      </div>
    );
  }
}

export default SentenceTile;
