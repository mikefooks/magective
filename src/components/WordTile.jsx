import React from "react";
import { connect } from "react-redux";

import UpdateInput from "./UpdateInput.jsx"


const mapStateToProps = (state, ownProps) => {
  const wordStr = state.getIn(["objects", ownProps.wordId, "wordStr"]);
  const isFocused = state.get("focused") == ownProps.wordId;
  const inputValue = state.get("updateInputValue");
  const editMode = state.get("editMode") &&
		   state.get("focused") == ownProps.wordId;

  return { wordStr, isFocused, inputValue, editMode };
}

export const WordTile = (props) => {
  const { wordId,
	  wordStr,
	  inputValue,
	  isFocused,
	  isFirst,
	  isLast,
	  editMode } = props;

  let displayString = editMode ? inputValue : wordStr;
  if (displayString.length <= 0) {
    displayString = "-";
  }

  return (
    <div className="wordTile">
	<h1 className={ isFocused ? "focused" : null }>
	    { displayString }
	</h1>
	{ editMode ? <UpdateInput wordId={wordId}
				  wordStr={inputValue} /> : null }
    </div>
  );
}

export default connect(mapStateToProps)(WordTile);
