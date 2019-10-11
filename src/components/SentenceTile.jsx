import React from "react";
import { connect } from "react-redux";

import WordTile from "./WordTile.jsx";

import { sentenceToTarget } from "../state_mgmt/actions";

let wordCounter = 0;

const mapStateToProps = (state, ownProps) => {
  let sentence = state.sentences[ownProps.sentenceId];
  return { sentence };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sentenceToTarget: () => dispatch(sentenceToTarget(ownProps.sentenceId))
  };
}

class ConnectedSentenceTile extends React.Component {
  constructor () {
    super();
  }

  render () {
    let wordList = this.props.sentence.words,
	tiles = _.map(wordList, word => {
	  return <WordTile key={wordCounter++} wordId={word.id} />
	});
  
    return (
      <div className="sentenceTile"
	   onClick={this.props.sentenceToTarget}>
	  {tiles}
      </div>
    );
  }
}

const SentenceTile = connect(mapStateToProps,
			     mapDispatchToProps)(ConnectedSentenceTile);

export default SentenceTile;
