import _ from "lodash";
import uuid4 from "uuid4";
import { Map, OrderedSet } from "immutable";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_TARGET,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD
} from "./actions";

const testSentence = Sentence("This is pretty cool and I'm confident it'll all work out.");

let initialState = Map({
  focused: testSentence.getIn(["words", 0, "id"]),
  words: Map(),
  sentences: Map(),
  target: OrderedSet(),
  quiver: OrderedSet([ testSentence.get("id") ])
});

initialState = initialState.setIn(["sentences", testSentence.get("id")], testSentence);
const newWords = Map(testSentence.get("words").reduce((obj, word) => {
  obj[word.get("id")] = word;
  return obj;
}, {}));

initialState = initialState.set("words", newWords);

export function bootstrap (state = initialState, action) {
  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      const newSentence = Sentence(action.payload);
      const newWords = newSentence.get("words").reduce((obj, word) => {
	obj[word.get("id")] = word;
	return obj;
      }, {});

      return state.update("words", col => col.merge(newWords))
		  .update("sentences", col =>
		    col.set(newSentence.get("id"), newSentence))
		  .update("quiver", col =>
		    col.add(newSentence.get("id")));

    case SENTENCE_TO_TARGET:
      const sentId = action.payload.sentenceId;
      return state.update("quiver", col =>
	            col.filterNot(id => id == sentId))
		  .update("target", col =>
		    col.add(sentId));

    case SWITCH_ACTIVATE_WORD:
      const wordId = action.payload.wordId;

      return state.updateIn([ "words", wordId ], word => {
	const currentStatus = word.get("active");
	return word.set("active", !currentStatus);
      });
  }

  return state;
}
