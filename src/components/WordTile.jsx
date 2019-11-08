import React from "react";
import { connect } from "react-redux";


const mapStateToProps = (state, ownProps) => {
  const wordStr = state.getIn(["objects", ownProps.wordId, "wordStr"]);
  const isFocused = state.get("focused") == ownProps.wordId;
  const editMode = state.get("editMode") &&
		   state.get("focused") == ownProps.wordId;

  return { wordStr, isFocused, editMode };
}

export const WordTile = ({ wordId,
			   wordStr,
			   isFocused,
			   isFirst,
			   isLast,
			   editMode }) => {

  const editModeStyles = { display: editMode ? "inline" : "none" };

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
