import _ from "lodash";

import {
  MOVE_WORD_TO_BOARD,
  MOVE_WORD_TO_QUIVER
} from "./actions";

let someWords = "This is super-duper dope and I really hope "
	      + "you like it a lot.";

someWords = someWords.split(" ");

const wordFactory = (word, key) => {
  return { word, key };
};

const initialState = {
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

export function wordToBoard (state, action) {
  let newState = _.cloneDeep(state),
      wordObj = _.clone(_.find(state.quiver.words,
			       word =>
				 word.key == action.key));

  newState.board.words.push(wordObj);
  
  newState.quiver.words = _.filter(state.quiver.words,
				   word =>
				     word.key != action.key);

  return newState;
}

export function wordToQuiver (state, action) {

}  
