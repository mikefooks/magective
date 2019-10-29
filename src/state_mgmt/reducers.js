import _ from "lodash";
import uuid4 from "uuid4";
import { Map, OrderedSet } from "immutable";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_TARGET,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD,
  SHIFT_FOCUS,
  DIRECTIONS
} from "./actions";

const testSentence = Sentence("Instructions to follow.");

let initialState = Map({
  focused: testSentence.getIn(["words", 2, "id"]),
  objects: Map(),
  target: OrderedSet(),
  quiver: OrderedSet([ testSentence.get("id") ])
});

initialState = initialState.setIn(["objects", testSentence.get("id")],
				  testSentence);

const newWords = Map(testSentence.get("words").reduce((obj, word) => {
  obj[word.get("id")] = word;
  return obj;
}, {}));

initialState = initialState.update("objects", col => {
  return col.merge(newWords);
});

export function bootstrap (state = initialState, action) {
  switch (action.type) {
    case SENTENCE_TO_QUIVER:
      const newSentence = Sentence(action.payload);
      const newWords = newSentence.get("words").reduce((obj, word) => {
	obj[word.get("id")] = word;
	return obj;
      }, {});

      return state.update("objects", col => {
	return col.merge(newWords)
		  .set(newSentence.get("id"), newSentence);
      })
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

      return state.updateIn([ "objects", wordId ], word => {
	const currentStatus = word.get("active");
	return word.set("active", !currentStatus);
      });

    case SHIFT_FOCUS:
      return shiftFocusReducer(state, action);
  }

  return state;
}

function shiftFocusReducer (state, action) {
  const focusedKey = state.get("focused");
  let newFocusedKey;

  switch (action.payload.direction) {
    case DIRECTIONS.LEFT:
      const focusedObj = state.getIn(["objects", focusedKey]);
      
      if (focusedObj.get("type") == "Word") {
	const parentKey = focusedObj.get("parentId");
	const wordOrd = focusedObj.get("order");
	
	if (wordOrd == 0) {
	  newFocusedKey = parentKey;
	} else {
	  const focusedParent = state.getIn(["objects", parentKey]);
	  newFocusedKey = focusedParent.getIn(["words", wordOrd-1, "id"]);
	}

      } else if (focusedObj.get("type") == "Sentence") {
	const size = focusedObj.get("size");
	const lastWordKey = focusedObj.getIn(["words", size-1, "id"]);

	newFocusedKey = lastWordKey;
      }

      break;
    default:
      newFocusedKey = focusedKey;
  }

  return state.set("focused", newFocusedKey);
}
