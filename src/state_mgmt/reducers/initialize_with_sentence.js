import { Map } from "immutable";
import { Sentence } from "../data_types";


export default function initializeWithSentenceReducer (state, action) {
  const { sentenceStr } = action.payload;
  const newSentence = Sentence(sentenceStr);
  const sentId = newSentence.get("id");

  const newWords = Map(newSentence.get("words").reduce((obj, word) => {
    obj[word.get("id")] = word;
    return obj;
  }, {}));

  return state.set("focused", sentId)
	      .setIn(["objects", sentId], newSentence)
	      .update("quiver", lst => lst.push(sentId))
	      .update("objects", col => col.merge(newWords));
}
