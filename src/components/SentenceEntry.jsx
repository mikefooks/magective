import store from "../state_mgmt/store";
import { addNewSentence } from "../state_mgmt/actions";

import React from "react";


const handleClick = (evt) => {
  let inputValue = evt.target.previousSibling.value;
  store.dispatch(addNewSentence(inputValue.trim()));
  evt.target.previousSibling.value = "";
}
  
const SentenceEntry = (props) => {
  return (
    <div className="sentenceEntry">
	<input type="text"
	       id="sentence-input"
	       className="mousetrap" />
	<button onClick={handleClick}>Done</button>
    </div>
  );
}

export default SentenceEntry;
