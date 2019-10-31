export const SENTENCE_TO_TARGET = "SENTENCE_TO_TARGET";
export const SENTENCE_TO_QUIVER = "SENTENCE_TO_QUIVER";
export const SWITCH_ACTIVATE_WORD = "SWITCH_ACTIVATE_WORD";
export const SHIFT_FOCUS = "SHIFT_FOCUS";
export const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";



export const DIRECTION = Object.freeze({
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right")		
});

export function sentenceToTarget (sentenceId) {
  return {
    type: SENTENCE_TO_TARGET,
    payload: {
      sentenceId
    }
  };
}

export function sentenceToQuiver (sentenceStr) {
  return {
    type: SENTENCE_TO_QUIVER,
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
