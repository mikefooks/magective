import React from "react";
import { connect } from "react-redux";

import SentenceTile from "./SentenceTile.jsx";
import WordTile from "./WordTile.jsx";


let sentenceCounter = 1000;

const mapStateToProps = (state, ownProps) => {
  let sentenceIds;

  if (ownProps.role == "committed") {
    sentenceIds = state.get("committed");
  } else if (ownProps.role == "sandbox") {
    sentenceIds = state.get("sandbox");
  }
  
  return { sentenceIds };
}

export const WordBoard = ({ sentenceIds, role }) => {
  const areSentences = sentenceIds.size > 0,
	classNames = "wordBoard " + role;

  if (areSentences) {
    let tiles = sentenceIds.map(sentId => {
      return <SentenceTile key={sentenceCounter++} sentenceId={sentId} />
    });

    return (
      <div className={classNames}>
	  {tiles}
      </div>
    );
  } else {
    return (
      <div className={classNames}>
	  <h2>Nothing here...</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WordBoard);
