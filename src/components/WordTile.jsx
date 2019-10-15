import React from "react";
import { connect } from "react-redux";

import { switchActivateWord } from "../state_mgmt/actions";


const mapStateToProps = (state, ownProps) => {
  return {
    word: state.words[ownProps.wordId]
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchActivate: function (evt) {
      evt.stopPropagation();
      dispatch(switchActivateWord(ownProps.wordId));
    }
  };
};

const ConnectedWordTile = ({ word, switchActivate }) => {
  const wordStr = word.word,
	active = word.active ? "active" : "retired";
  
  return (
    <div className="wordTile">
	<h1
	  className={active}
	  onClick={switchActivate}>
	    {wordStr}
	</h1>
    </div>
  );
}

const WordTile = connect(mapStateToProps,
			 mapDispatchToProps)(ConnectedWordTile);

export default WordTile
