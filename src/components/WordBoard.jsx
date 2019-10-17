import _ from "lodash";

import React from "react";
import { connect } from "react-redux";

import SentenceTile from "./SentenceTile.jsx";
import WordTile from "./WordTile.jsx";


let sentenceCounter = 1000;

const mapStateToProps = (state, ownProps) => {
  let sentenceIds;

  if (ownProps.role == "target") {
    sentenceIds = state.target;
  } else if (ownProps.role == "quiver") {
    sentenceIds = state.quiver;
  }
  
  return { sentenceIds };
}

export const WordBoard = ({ sentenceIds, role }) => {
  const areSentences = sentenceIds.length > 0,
	classNames = "wordBoard " + role;

  if (areSentences) {
    let tiles = _.map(sentenceIds, sentId => {
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
