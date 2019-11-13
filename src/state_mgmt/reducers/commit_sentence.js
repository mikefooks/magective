export default function commitSentenceReducer (state, action) {
  const { sentenceId } = action.payload;

  return state.update("sandbox", col => {
                return col.filterNot(id => id == sentenceId)
              })
	      .update("committed", col => col.push(sentenceId));
}
