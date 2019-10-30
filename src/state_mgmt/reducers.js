import uuid4 from "uuid4";
import { Map, List } from "immutable";

import { Sentence } from "./data_types";

import {
  SENTENCE_TO_TARGET,
  SENTENCE_TO_QUIVER,
  SWITCH_ACTIVATE_WORD,
  SHIFT_FOCUS,
  DIRECTION
} from "./actions";

const testSentence = Sentence("Instructions to follow.", 0);

let initialState = Map({
  focused: testSentence.getIn(["words", 2, "id"]),
  objects: Map(),
  target: List(),
  quiver: List.of(testSentence.get("id"))
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
      const quiverLength = state.get("quiver").size;
      const newSentence = Sentence(action.payload, quiverLength);
      const newWords = newSentence.get("words").reduce((obj, word) => {
	obj[word.get("id")] = word;
	return obj;
      }, {});

      return state.update("objects", col =>
	col.merge(newWords)
	   .set(newSentence.get("id"), newSentence))
		  .update("quiver", col =>
		    col.push(newSentence.get("id")));
      
    case SENTENCE_TO_TARGET:
      const sentId = action.payload.sentenceId;
      return state.update("quiver", col =>
	            col.filterNot(id => id == sentId))
		  .update("target", col =>
		    col.push(sentId));

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


/*
DIRECTIONL.LEFT and DIRECTION.RIGHT control 
word-level focus, whereas DIRECTION.UP and
DIRECTION.DOWN control sentence-level focus.
*/

function shiftFocusReducer (state, action) {
  const focusedKey = state.get("focused");
  const focusedObj = state.getIn(["objects", focusedKey]);
  let newFocusedKey;

  switch (action.payload.direction) {

    case DIRECTION.LEFT:
      
      if (focusedObj.get("type") == "Word") {
	const parentKey = focusedObj.get("parentId");
	const wordOrd = focusedObj.get("order");
	
	if (wordOrd == 0) {
	  newFocusedKey = parentKey;
	} else {
	  const focusedParent = state.getIn(["objects", parentKey]);
	  const previousWordKey = focusedParent.getIn(["words", wordOrd-1, "id"]);
	  newFocusedKey = previousWordKey;
	}

      } else if (focusedObj.get("type") == "Sentence") {
	const size = focusedObj.get("size");
	const lastWordKey = focusedObj.getIn(["words", size-1, "id"]);
	newFocusedKey = lastWordKey;
      }

      break;

    case DIRECTION.RIGHT:

      if (focusedObj.get("type") == "Word") {
	const parentKey = focusedObj.get("parentId");
	const focusedParent = state.getIn(["objects", parentKey]);
	const wordOrd = focusedObj.get("order");

	if (wordOrd+1 >= focusedParent.get("size")) {
	  newFocusedKey = parentKey;
	} else {
	  const newWordKey = focusedParent.getIn(["words", wordOrd+1, "id"]);
	  newFocusedKey = newWordKey;
	}
	
      } else if (focusedObj.get("type") == "Sentence") {
	const firstWordKey = focusedObj.getIn(["words", 0, "id"]);
	newFocusedKey = firstWordKey;
      }

      break;

    case DIRECTION.UP:
      if (focusedObj.get("type") == "Word") {
	const parentKey = focusedObj.get("parentId");
	newFocusedKey = parentKey;
      } else if (focusedObj.get("type") == "Sentence") {
	const sentenceOrd = focusedObj.get("order");
	if (sentenceOrd <= 0) {
	  const quiverLength = state.get("quiver").size;
	  const quiver = state.get("quiver");
	  const lastSentenceKey = quiver.get(quiverLength-1);
	  newFocusedKey = lastSentenceKey;
	} else {
	  const prevSentenceKey = state.getIn(["quiver", sentenceOrd-1]);
	  newFocusedKey = prevSentenceKey;
	}
      }

      break;
      
    default:

      newFocusedKey = focusedKey;
  }

  return state.set("focused", newFocusedKey);
}
