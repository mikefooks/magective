import React from "react";

import WordTile from "./WordTile.jsx";


class SentenceTile extends React.Component {
  constructor () {
    super();
  }

  render () {
    let wordList = this.props.sentence.getTokens(),
	tiles = _.map(wordList, word => {
	  return <WordTile key={word.key} word={word.word} />
	});
  
    return (
      <div className="sentenceTile">
	  {tiles}
      </div>
    );
  }
}

export default SentenceTile;
