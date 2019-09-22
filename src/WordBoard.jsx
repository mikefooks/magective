import _ from "lodash";

import React from "react";
import WordTile from "./WordTile.jsx";


class WordBoard extends React.Component {
  constructor () {
    super();
  }

  render () {
    let classNames = "wordBoard " + this.props.role,
	tiles = _.map(this.props.words, word => {
	  return <WordTile word={word.word} key={word.idx} />
	});

    return (
      <div className={classNames}>
	  {tiles}
      </div>
    );
  }
}

export default WordBoard;
