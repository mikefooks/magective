import React from "react";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
  const word = state.getIn(["objects", ownProps.wordId])
  const isFocused = state.get("focused") == ownProps.wordId;
  const editMode = state.get("editMode") &&
		   state.get("focused") == ownProps.wordId;

  return { word, isFocused, editMode };
}

export const WordTile = ({ word,
			   wordId,
			   isFocused,
			   isFirst,
			   isLast,
			   editMode }) => {

  const editModeStyles = { display: editMode ? "inline" : "none" };

  let wordStr = word.get("wordStr");

  return (
    <div className="wordTile">
	<h1 className={ isFocused ? "focused" : null }>
	    {wordStr}
	</h1>
	<input
	  type="text"
	  id={ "input-" + wordId }
	  className="mousetrap"
	  style={ editModeStyles }  />
    </div>
  );
}

export default connect(mapStateToProps)(WordTile);
