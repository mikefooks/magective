import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { focus } from "../state_mgmt/actions";
import WordTile from "./WordTile.jsx";


let wordCounter = 0;

const mapStateToProps = (state, ownProps) => {
  const sentence = state.getIn(["objects", ownProps.sentenceId]);
  const isFocused = state.get("focused") == ownProps.sentenceId;

  return { sentence, isFocused };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    focusHandler: function (evt) {
      return dispatch(focus(ownProps.sentenceId));
    }
  };
}

export const SentenceTile = ({ sentence, isFocused, focusHandler }) => {
  const sentLen = sentence.get("size");
  const tiles = sentence.get("words").map((word, idx) => {
    const tile = <WordTile key={wordCounter++}
		                       isFirst={ idx == 0 }
		                       isLast={ idx >= sentLen-1 }
                           wordId={word.get("id")} />
      return tile;
  });

  return (
    <div className={ isFocused ? "sentenceTile focused" : "sentenceTile" }
         onClick={ focusHandler.bind(this) }>
	    {tiles}
    </div>
  );
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(SentenceTile);
