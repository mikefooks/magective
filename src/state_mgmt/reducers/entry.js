import React from "react";
import uuid4 from "uuid4";
import { Map, List } from "immutable";

import { Sentence } from "../data_types";
import shiftFocusReducer from "./shift_focus";

import {
  SENTENCE_TO_TARGET,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD,
  SHIFT_FOCUS,
  TOGGLE_EDIT_MODE,
  UPDATE_EDITED_WORD,
  DIRECTION
} from "../actions";

const testSentence = Sentence("Instructions to follow.", 0);

let initialState = Map({
  focused: testSentence.getIn(["words", 2, "id"]),
  editMode: false,
  objects: Map(),
  target: List(),
  quiver: List.of(testSentence.get("id"))
});

initialState = initialState.setIn(["objects", testSentence.get("id")],
				  testSentence);

const newWords = Map(testSentence.get("words").reduce((obj, word) => {
  obj[word.get("id")] = word;
  return obj;
}, {}));

initialState = initialState.update("objects", col => {
  return col.merge(newWords);
});

export function bootstrap (state = initialState, action) {
  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      const quiverLength = state.get("quiver").size;
      const newSentence = Sentence(action.payload, quiverLength);
      const newWords = newSentence.get("words").reduce((obj, word) => {
	obj[word.get("id")] = word;
	return obj;
      }, {});

      return state.update("objects", col =>
	col.merge(newWords).set(newSentence.get("id"), newSentence))
		  .update("quiver", col =>
		    col.push(newSentence.get("id")));
    
    case SENTENCE_TO_TARGET:
      const sentId = action.payload.sentenceId;
      return state.update("quiver", col =>
	            col.filterNot(id => id == sentId))
		  .update("target", col =>
		    col.push(sentId));

    case SWITCH_ACTIVATE_WORD:
      const wordId = action.payload.wordId;

      return state.updateIn([ "objects", wordId ], word => {
	const currentStatus = word.get("active");
	return word.set("active", !currentStatus);
      });

    case SHIFT_FOCUS:
      return shiftFocusReducer(state, action);

    case TOGGLE_EDIT_MODE:
      return state.update("editMode", mode => !mode);

    case UPDATE_EDITED_WORD:
      return updateEditedWordReducer(state, action);
  }

  return state;
}

function updateEditedWordReducer (state, action) {
  const wordId = action.payload.wordId;
  const newWord = action.payload.newWord;

  return state.updateIn(["objects", wordId], word => {
    return word.set("wordStr", newWord);
  });  
}
