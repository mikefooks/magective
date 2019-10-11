export const SENTENCE_TO_TARGET = "SENTENCE_TO_TARGET";
export const SENTENCE_TO_QUIVER = "SENTENCE_TO_QUIVER";
export const SWITCH_ACTIVATE_WORD = "SWITCH_ACTIVATE_WORD"; 


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
