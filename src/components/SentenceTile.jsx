import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import WordTile from "./WordTile.jsx";


let wordCounter = 0;

const mapStateToProps = (state, ownProps) => {
  const sentence = state.getIn(["objects", ownProps.sentenceId]);
  const isFocused = state.get("focused") == ownProps.sentenceId;

  return { sentence, isFocused };
}

export const SentenceTile = ({ sentence, isFocused, sentenceToTarget }) => {
  const tiles = sentence.get("words").map(word => {
    return <WordTile key={wordCounter++} wordId={word.get("id")} />
  });
  
  return (
    <div className={ isFocused ? "sentenceTile focused" : "sentenceTile" }>
	{tiles}
    </div>
  );
}

export default connect(mapStateToProps)(SentenceTile);
