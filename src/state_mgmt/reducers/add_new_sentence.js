import { Sentence } from "../data_types";

export default function addNewSentenceReducer (state, action) {
  const quiverLength = state.get("quiver").size;
  const newSentence = Sentence(action.payload, quiverLength);
  const newWords = newSentence.get("words").reduce((obj, word) => {
    obj[word.get("id")] = word;
    return obj;
  }, {});

  return state.update("objects", col =>
    col.merge(newWords).set(newSentence.get("id"), newSentence))
	      .update("quiver", col =>
		col.push(newSentence.get("id")));
}
