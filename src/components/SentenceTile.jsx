import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import WordTile from "./WordTile.jsx";
import { sentenceToTarget } from "../state_mgmt/actions";


let wordCounter = 0;

const mapStateToProps = (state, ownProps) => {
  const sentence = state.getIn(["sentences", ownProps.sentenceId]);
  return { sentence };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sentenceToTarget: () => dispatch(sentenceToTarget(ownProps.sentenceId))
  };
}

export const SentenceTile = ({ sentence, sentenceToTarget }) => {
  const wordList = sentence.words,
	tiles = _.map(wordList, word => {
	  return <WordTile key={wordCounter++} wordId={word.id} />
	});
  
  return (
    <div className="sentenceTile"
	 onClick={sentenceToTarget}>
	{tiles}
    </div>
  );
}

export default connect(mapStateToProps,
		       mapDispatchToProps)(SentenceTile);
