import _ from "lodash";

import React from "react";
import { connect } from "react-redux";

import SentenceTile from "./SentenceTile.jsx";
import WordTile from "./WordTile.jsx";


let sentenceCounter = 1000;

const mapStateToProps = (state, ownProps) => {
  let sentences;

  if (ownProps.role == "target") {
    sentences = _.map(state.target, id => state.sentences[id]);
  } else if (ownProps.role == "quiver") {
    sentences = _.map(state.quiver, id => state.sentences[id]);
  }
  
  return { sentences };
}


class ConnectedWordBoard extends React.Component {
  constructor () {
    super();
  }

  render () {
    console.log(this.props);
    let classNames = "wordBoard " + this.props.role,
	tiles = _.map(this.props.sentences, sent => {
	  return <SentenceTile key={sentenceCounter++} sentence={sent} />
	});

    return (
      <div className={classNames}>
	  {tiles}
      </div>
    );
  }
}

const WordBoard = connect(mapStateToProps)(ConnectedWordBoard);

export default WordBoard;
