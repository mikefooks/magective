export default function deleteWordReducer (state, action) {
  const { wordId } = action.payload;
  const word = state.getIn(["objects", wordId]);
  const focusedParent = state.getIn(["objects", word.get("parentId")])
  const wordIdx = focusedParent.get("words")
			       .map(w => w.get("id"))
			       .indexOf(wordId);

  console.log(wordId);
  console.log(focusedParent);

  const previousWordId = focusedParent.getIn(["words", wordIdx-1, "id"] )

  return state.set("focused", previousWordId)
	      .updateIn(["objects", focusedParent.get("id"), "words"], wordList => {
		console.log(wordList);
		const newWordList = wordList.delete(wordIdx);
		console.log(newWordList);
		return newWordList;
	      })
	      .update("objects", mp => {
		console.log(focusedParent);
		return mp.delete(wordId);
	      });
}
