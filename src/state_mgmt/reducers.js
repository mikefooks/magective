import _ from "lodash";
import uuid4 from "uuid4";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_BOARD,
  SENTENCE_TO_QUIVER
} from "./actions";

const testSentence = new Sentence("This is pretty cool and I'm confident it'll all work out.");
const testSentHash = uuid4();

const initialState = {
  sentences: {},
  board: [],
  quiver: [ testSentHash ]
};

initialState.sentences[testSentHash] = testSentence;

export function bootstrap (state = initialState, action) {
  switch (action.type) {
  case SENTENCE_TO_QUIVER:
    let newState = _.cloneDeep(state);
    let newSentence = new Sentence(action.payload);
    let id = uuid4();

    newState.sentences[id] = newSentence;
    newState.quiver.push(id);
    console.log(newState);
    
    return newState;
  default:
    return state;
  }
}
