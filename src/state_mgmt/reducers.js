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
  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      const newSentence = new Sentence(action.payload);
      const newWords = newSentence.words.reduce((obj, word) => {
	obj[word.id] = word;
	return obj;
      }, {});

      return state.update("words", col => col.merge(newWords))
		  .update("sentences", col =>
		    col.set(newSentence.id, newSentence))
		  .update("quiver", col =>
		    col.add(newSentence.id));

    case SENTENCE_TO_TARGET:
      const sentId = action.payload.sentenceId;
      return state.update("quiver", col =>
	            col.filterNot(id => id == sentId))
		  .update("target", col =>
		    col.add(sentId));

    case SWITCH_ACTIVATE_WORD:
      const wordId = action.payload.wordId;

      return state.updateIn([ "words", wordId ], word => {
	const newWord = _.clone(word);
	newWord.active = newWord.active ? false : true;
	return newWord;
      });
  }

  return state;
}
