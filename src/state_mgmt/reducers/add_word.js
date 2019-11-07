import { ADD_WORD_INSERT,
	 ADD_WORD_APPEND } from "../actions";
import { Word } from "../data_types.js";

export default function addWordReducer (state, action) {
  const { type } = action;
  const focusedKey = state.get("focused");
  const parentKey = state.getIn(["objects", focusedKey, "parentId"]);
  const focusedIdx = state.getIn(["objects", parentKey, "words"])
			  .map(w => w.get("id"))
			  .indexOf(focusedKey);

  const newWord = Word("", parentKey);
  return state.update("objects", mp => mp.set(newWord.get("id"), newWord))
	      .updateIn(["objects", parentKey, "words"], lst => {
		if (type == ADD_WORD_INSERT) {
		  return lst.insert(focusedIdx, newWord);
		} else if (type == ADD_WORD_APPEND) {
		  return lst.insert(focusedIdx+1, newWord);
		}
	      })
	      .updateIn(["objects", parentKey, "wordIds"], lst => {
		if (type == ADD_WORD_INSERT) {
		  return lst.insert(focusedIdx, newWord.get("id"));
		} else if (type == ADD_WORD_APPEND) {
		  return lst.insert(focusedIdx+1, newWord.get("id"));
		}
	      })
	      .set("focused", newWord.get("id"))
	      .set("editMode", true);
}
