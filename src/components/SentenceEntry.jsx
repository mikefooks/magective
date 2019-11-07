import React from "react";
import { connect } from "react-redux";

import { addNewSentence } from "../state_mgmt/actions";


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: () => {
      const inputEl = document.getElementById("sentence-input");
      let inputValue = inputEl.value;
      dispatch(addNewSentence(inputValue.trim()));
      inputEl.value = "";
    }    
  };
};
  
const SentenceEntry = ({ handleClick }) => {
  return (
    <div className="sentenceEntry">
	<input type="text"
	       id="sentence-input"
	       className="mousetrap" />
	<button onClick={handleClick}>Done</button>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(SentenceEntry);
