import _ from "lodash";

import {
  MOVE_WORD_TO_BOARD,
  MOVE_WORD_TO_QUIVER,
  SENTENCE_TO_QUIVER,
} from "./actions";

let someWords = "This is super-duper dope and I really hope "
	      + "you like it a lot.";

someWords = someWords.split(" ");

let count = 0;

const wordFactory = (word) => {
  return { word, idx: count++ };
};

const initialState = {
  board: {
    words: []
  },
  quiver: {
    words: _.shuffle(_.map(someWords, wordFactory))
  }
};

export function bootstrap (state = initialState, action) {
  if (action.type == MOVE_WORD_TO_BOARD) {
    const source = "quiver",
	  target = "board",
	  wordObj = _.clone(_.find(state[source].words,
				   word => word.idx == action.idx));

    const newState = _.cloneDeep(state);

    newState[target].words.push(wordObj);
    newState[source].words = _.filter(state[source].words,
				      word => word.idx != action.idx);
    console.log(newState);
    return newState;

  } else if (action.type == SENTENCE_TO_QUIVER) {
    const newState = _.cloneDeep(state),
	  newWords = _.map(action.sentenceStr.split(" "), wordFactory);

    newState.quiver.words = state["quiver"].words.concat(newWords);

    return newState;
  }
  
  return state;
}
