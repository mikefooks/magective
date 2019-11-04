export default function deleteWordReducer (state, action) {
  const { wordId } = action.payload;
  const word = state.getIn(["objects", wordId]);
  const focusedParent = state.getIn(["objects", word.get("parentId")])
  const previousWord = focusedParent.getIn(["words", word.get("order")-1]);

  return state.set("focused", previousWord.get("id"))
	      .updateIn(["objects",
			 focusedParent.get("id"),
			 "words"],
			lst => {
			  return lst.delete(word.get("order"));
			})
	      .update("objects", mp => {
		return mp.delete(wordId);
	      });
}
