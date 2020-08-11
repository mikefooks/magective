import { Sentence } from "../data_types";

export default function addNewSentenceReducer (state, action) {
  const { sentenceStr } = action.payload;
  const sandBoxLength = state.get("sandbox").size;
  const newSentence = Sentence(sentenceStr, sandBoxLength);

  const newWords = newSentence.get("words").reduce((obj, word) => {
    obj[word.get("id")] = word;
    return obj;
  }, {});

  return state.update("objects", col =>
    col.merge(newWords).set(newSentence.get("id"), newSentence))
	      .update("sandbox", col =>
		col.push(newSentence.get("id")));
}
