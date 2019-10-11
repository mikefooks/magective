import _ from "lodash";
import uuid4 from "uuid4";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_BOARD,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD
} from "./actions";

const testSentence = new Sentence("This is pretty cool and I'm confident it'll all work out.");
const testSentHash = uuid4();

const initialState = {
  words: {},
  sentences: {},
  board: [],
  quiver: [ testSentHash ]
};

initialState.sentences[testSentHash] = testSentence;
_.each(testSentence.words, function (word) {
  initialState.words[word.id] = word;
});
  

export function bootstrap (state = initialState, action) {
  let newState = _.cloneDeep(state);

  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      let newSentence = new Sentence(action.payload);

      newState.sentences[newSentence.id] = newSentence;
      newState.quiver.push(newSentence.id);
      _.each(newSentence.getTokens(), word => {
	newState.words[word.id] = word;
      });

      return newState;

  case SWITCH_ACTIVATE_WORD:
      let theWord = newState.words[action.payload.wordId];
      let newWord = _.cloneDeep(theWord);

      newWord.active = true ? false : true;
      newState.words[action.payload.wordId] = newWord;

      return newState;
	
    default:
      return state;
  }
}
