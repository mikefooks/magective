import _ from "lodash";

import { Sentence } from "./data_types";

import {
  MOVE_WORD_TO_BOARD,
  MOVE_WORD_TO_QUIVER,
  SENTENCE_TO_QUIVER,
} from "./actions";

const testSentence = new Sentence("This is pretty cool and I'm confident it'll all work out.");

let count = 0;

const initialState = {
  board: [],
  quiver: [testSentence]
};

export function bootstrap (state = initialState, action) {
  if (action.type == MOVE_WORD_TO_BOARD) {
    const source = "quiver",
	  target = "board",
	  wordObj = _.clone(_.find(state[source],
				   word => word.idx == action.idx));

    const newState = _.cloneDeep(state);

    newState[target].push(wordObj);
    newState[source] = _.filter(state[source],
				word => word.idx != action.idx);
    console.log(newState);
    return newState;

  } else if (action.type == SENTENCE_TO_QUIVER) {
    const newState = _.cloneDeep(state),
	  newWords = _.map(action.sentenceStr.split(" "), wordFactory);

    newState.quiver = state["quiver"].concat(newWords);

    return newState;
  }
  
  return state;
}
