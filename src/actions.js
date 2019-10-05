export const MOVE_WORD_TO_BOARD = "MOVE_WORD_TO_BOARD";
export const MOVE_WORD_TO_QUIVER = "MOVE_WORD_TO_QUIVER";
export const SENTENCE_TO_QUIVER = "SENTENCE_TO_QUIVER";

/* In future, these constants can be assigned to RESTful URLs. */

export function wordToBoard (idx) {
  return {
    type: MOVE_WORD_TO_BOARD,
    idx
  };
}

export function wordToQuiver (idx) {
  return {
    type: MOVE_WORD_TO_QUIVER,
    idx
  };
}

export function sentenceToQuiver (sentenceStr) {
  return {
    type: SENTENCE_TO_QUIVER,
    sentenceStr
  };
}
