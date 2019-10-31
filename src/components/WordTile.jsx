import React from "react";
import { connect } from "react-redux";

import { switchActivateWord } from "../state_mgmt/actions";


const mapStateToProps = (state, ownProps) => {
  const word = state.getIn(["objects", ownProps.wordId])
  const isFocused = state.get("focused") == ownProps.wordId;
  const editMode = state.get("editMode");

  return { word, isFocused, editMode };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchActivate: function (evt) {
      evt.stopPropagation();
      dispatch(switchActivateWord(ownProps.wordId));
    }
  };
};

export const WordTile = ({ word, isFocused, editMode, switchActivate }) => {
  const wordStr = word.get("word");
  const active = word.get("active") ? "active" : "retired";
  const editModeStyles = { display: editMode ? "inline-block" : "none" }
  
  return (
    <div className={ isFocused ? "wordTile focused" : "wordTile" }>
	<h1
	  className={active}
	  onClick={switchActivate}>
	    {wordStr}
	</h1>
	<input type="text"
	       style={ editModeStyles } />
    </div>
  );
}

export default connect(mapStateToProps,
		       mapDispatchToProps)(WordTile);
