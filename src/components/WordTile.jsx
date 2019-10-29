import React from "react";
import { connect } from "react-redux";

import { switchActivateWord } from "../state_mgmt/actions";


const mapStateToProps = (state, ownProps) => {
  const word = state.getIn(["objects", ownProps.wordId])
  const isFocused = state.get("focused") == ownProps.wordId;

  return { word, isFocused };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchActivate: function (evt) {
      evt.stopPropagation();
      dispatch(switchActivateWord(ownProps.wordId));
    }
  };
};

export const WordTile = ({ word, isFocused, switchActivate }) => {
  const wordStr = word.get("word");
  const active = word.get("active") ? "active" : "retired";
  
  return (
    <div className={ isFocused ? "wordTile focused" : "wordTile" }>
	<h1
	  className={active}
	  onClick={switchActivate}>
	    {wordStr}
	</h1>
    </div>
  );
}

export default connect(mapStateToProps,
		       mapDispatchToProps)(WordTile);
