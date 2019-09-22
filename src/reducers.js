import _ from "lodash";

import {
  MOVE_WORD_TO_BOARD,
  MOVE_WORD_TO_QUIVER
} from "./actions";

let someWords = "This is super-duper dope and I really hope "
	      + "you like it a lot.";

someWords = someWords.split(" ");

export const wordFactory = (word, key) => {
  return { word, key };
};

export const initialState = {
  board: {
    words: []
  },
  quiver: {
    words: _.shuffle(_.map(someWords, wordFactory))
  }
};

export function bootstrap (state, action) {
  if (state == undefined) {
    state = initialState;
  }

  return state;
}

export function moveWord (state, action) {
  const source = action.type == MOVE_WORD_TO_QUIVER ? "quiver" : "board",
	target = source == "quiver" ? "board" : "quiver",
	wordObj = _.clone(_.find(state[source].words,
				 word => word.key == action.key));

  const newState = _.cloneDeep(state);

  newState[target].words.push(wordObj);
  newState[source].words = _.filter(state[source].words,
				    word => word.key != action.key);
}
