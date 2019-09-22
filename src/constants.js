export const MOVE_WORD_TO_BOARD = "MOVE_WORD_TO_BOARD";
export const MOVE_WORD_TO_QUIVER = "MOVE_WORD_TO_QUIVER";


export const function wordToBoardFactory (key) {
  return {
    type: MOVE_WORD_TO_BOARD,
    key
  };
}

export const function wordToQuiverFactory (key) {
  return {
    type: MOVE_WORD_TO_QUIVER,
    key
  };
}
