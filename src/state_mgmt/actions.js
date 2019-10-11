export const SENTENCE_TO_TARGET = "SENTENCE_TO_TARGET";
export const SENTENCE_TO_QUIVER = "SENTENCE_TO_QUIVER";


export function sentenceToTarget (idx) {
  return {
    type: SENTENCE_TO_TARGET,
    idx
  };
}

export function sentenceToQuiver (sentenceStr) {
  return {
    type: SENTENCE_TO_QUIVER,
    payload: sentenceStr
  };
}
