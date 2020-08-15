import React from "react";
import uuid4 from "uuid4";
import { Map, List } from "immutable";

import { Sentence } from "../data_types";

import initializeWithSentenceReducer from "./initialize_with_sentence";
import addNewSentenceReducer from "./add_new_sentence";
import shiftFocusReducer from "./shift_focus";
import updateEditedWordReducer from "./update_edited_word";
import addWordReducer from "./add_word";
import deleteWordReducer from "./delete_word";

import {
  INITIALIZE_WITH_SENTENCE,
  COMMIT_SENTENCE,
  ADD_NEW_SENTENCE,
  FOCUS,
  SHIFT_FOCUS,
  TOGGLE_EDIT_MODE,
  UPDATE_EDITED_WORD,
  ADD_WORD_INSERT,
  ADD_WORD_APPEND,
  DELETE_WORD,
  CHANGE_UPDATE_INPUT
} from "../actions";

import {
  DIRECTION
} from "../actions";

export function getInitialState () {
  return Map({
    focused: "",
    editMode: false,
    updateInputValue: "",
    editValue: "",
    objects: Map(),
    committed: List(),
    sandbox: List()
  });
}

export function bootstrap (state = getInitialState(), action) {
  switch (action.type) {
  case INITIALIZE_WITH_SENTENCE:
    return initializeWithSentenceReducer(state, action);

  case ADD_NEW_SENTENCE:
    return addNewSentenceReducer(state, action);

  case COMMIT_SENTENCE:
    const sentId = action.payload.sentenceId;
    return state.update("sandbox", col =>
	                      col.filterNot(id => id == sentId))
		            .update("committed", col =>
		                    col.push(sentId));

  case FOCUS:
    return state.set("focused", action.payload.sentenceId)
      .set("editMode", false);

  case SHIFT_FOCUS:
    if (state.get("editMode")) {
	    return state;
    } else {
	    return shiftFocusReducer(state, action);
    }

  case TOGGLE_EDIT_MODE:
    const focusedId = state.get("focused");
    const focusedObj = state.getIn(["objects", focusedId]);
    const focusedWord = focusedObj.get("wordStr");
    const mode = state.get("editMode");

    if (focusedObj.get("type") == "Sentence") {
	    return state;
    }

    if (mode) {
	    return state.set("editMode", false);
    } else {
	    return state.set("updateInputValue", focusedWord)
		    .set("editMode", true);
    }

  case ADD_WORD_INSERT:
    return addWordReducer(state, action);

  case ADD_WORD_APPEND:
    return addWordReducer(state, action);

  case UPDATE_EDITED_WORD:
    return updateEditedWordReducer(state, action);

  case DELETE_WORD:
    return deleteWordReducer(state, action);

  case CHANGE_UPDATE_INPUT:
    let { wordValue } = action.payload;

    return state.set("updateInputValue", wordValue);
  }

  return state;
}
