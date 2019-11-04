import React from "react";
import uuid4 from "uuid4";
import { Map, List } from "immutable";

import { Sentence } from "../data_types";

import initializeWithSentenceReducer from "./initialize_with_sentence";
import addNewSentenceReducer from "./add_new_sentence";
import shiftFocusReducer from "./shift_focus";
import updateEditedWordReducer from "./update_edited_word";

import {
  INITIALIZE_WITH_SENTENCE,
  SENTENCE_TO_TARGET,
  ADD_NEW_SENTENCE,
  SWITCH_ACTIVATE_WORD,
  SHIFT_FOCUS,
  TOGGLE_EDIT_MODE,
  UPDATE_EDITED_WORD,
  DIRECTION
} from "../actions";

const initialState = Map({
  focused: "",
  editMode: false,
  objects: Map(),
  target: List(),
  quiver: List()
});

export function bootstrap (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_WITH_SENTENCE:
      return initializeWithSentenceReducer(state, action);
    case ADD_NEW_SENTENCE:
      return addNewSentenceReducer(state, action);      
    case SENTENCE_TO_TARGET:
      const sentId = action.payload.sentenceId;
      return state.update("quiver", col =>
	            col.filterNot(id => id == sentId))
		  .update("target", col =>
		    col.push(sentId));

    case SWITCH_ACTIVATE_WORD:
      const { wordId } = action.payload;

      return state.updateIn([ "objects", wordId ], word => {
	return word.set("active", !word.get("active"));
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
