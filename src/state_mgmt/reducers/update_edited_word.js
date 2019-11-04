export default function updateEditedWordReducer (state, action) {
  const wordId = action.payload.wordId;
  const newWord = action.payload.newWord;

  return state.updateIn(["objects", wordId], word => {
    return word.set("wordStr", newWord);
  });  
}
