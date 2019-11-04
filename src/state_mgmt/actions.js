export const SENTENCE_TO_TARGET = "SENTENCE_TO_TARGET";
export const INITIALIZE_WITH_SENTENCE = "INITIALIZE_WITH_SENTENCE";
export const ADD_NEW_SENTENCE = "ADD_NEW_SENTENCE";
export const SWITCH_ACTIVATE_WORD = "SWITCH_ACTIVATE_WORD";
export const SHIFT_FOCUS = "SHIFT_FOCUS";
export const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";
export const UPDATE_EDITED_WORD = "UPDATE_EDITED_WORD";
export const DELETE_WORD = "DELETE_WORD";


export const DIRECTION = Object.freeze({
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right")		
});

export function initializeWithSentence (sentenceStr) {
  return {
    type: INITIALIZE_WITH_SENTENCE,
    payload: {
      sentenceStr
    }
  };
}

export function sentenceToTarget (sentenceId) {
  return {
    type: SENTENCE_TO_TARGET,
    payload: {
      sentenceId
    }
  };
}

export function addNewSentence (sentenceStr) {
  return {
    type: ADD_NEW_SENTENCE,
    payload: sentenceStr
  };
}

export function switchActivateWord (wordId) {
  return {
    type: SWITCH_ACTIVATE_WORD,
    payload: {
      wordId
    }
  };
}

export function shiftFocus (direction) {
  return {
    type: SHIFT_FOCUS,
    payload: {
      direction
    }
  };
}

export function toggleEditMode () {
  return {
    type: TOGGLE_EDIT_MODE
  };
}

export function updateEditedWord (newWord, wordId) {
  return {
    type: UPDATE_EDITED_WORD,
    payload: {
      newWord,
      wordId
    }
  };
}

export function deleteWord (wordId) {
  return {
    type: DELETE_WORD,
    payload: {
      wordId
    }
  };
}
