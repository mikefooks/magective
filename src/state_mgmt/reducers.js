import _ from "lodash";
import uuid4 from "uuid4";
import { Map, OrderedSet } from "immutable";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_TARGET,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD
} from "./actions";

const testSentence = new Sentence("This is pretty cool and I'm confident it'll all work out.");

let initialState = Map({
  words: Map(),
  sentences: Map(),
  target: OrderedSet(),
  quiver: OrderedSet([ testSentence.id ])
});

initialState = initialState.setIn(["sentences", testSentence.id], testSentence);
const newWords = Map(testSentence.words.reduce((obj, word) => {
  obj[word.id] = word;
  return obj;
}, {}));
initialState = initialState.set("words",
				initialState.get("words").merge(newWords));

export function bootstrap (state = initialState, action) {
  /*  
  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      let newSentence = new Sentence(action.payload);

      newState.sentences[newSentence.id] = newSentence;
      newState.quiver.push(newSentence.id);
      _.each(newSentence.words, word => {
	newState.words[word.id] = word;
      });

      return newState;

    case SENTENCE_TO_TARGET:
      newState.quiver = _.filter(newState.quiver,
				 id => id != action.payload.sentenceId);
      newState.target.push(action.payload.sentenceId);

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
   */
  return state;
}
