export default function deleteWordReducer (state, action) {
  const { wordId } = action.payload;
  const word = state.getIn(["objects", wordId]);
  const parentId = word.get("parentId");
  const focusedParent = state.getIn(["objects", parentId]);
  const wordIdx = focusedParent.get("words")
			  .map(w => w.get("id"))
			  .indexOf(wordId);

  const previousWordId = focusedParent.getIn(["words", wordIdx-1, "id"] );

  return state.set("focused", previousWordId)
	  .updateIn(["objects", parentId, "words"], wordList => {
		  return wordList.delete(wordIdx);
	  })
	  .update("objects", mp => {
		  return mp.delete(wordId);
	  });
}
