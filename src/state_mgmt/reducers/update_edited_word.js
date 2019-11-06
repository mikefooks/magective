import { Map, List } from "immutable";

import { Word } from "../data_types";

export default function updateEditedWordReducer (state, action) {
  const wordId = action.payload.wordId;
  const currentWord = state.getIn(["objects", wordId]);
  const sentenceId = currentWord.get("parentId");
  const wordIdx = state.getIn(["objects", sentenceId, "words"])
		       .map(w => w.get("id"))
		       .indexOf(wordId);

  const newWordStr = action.payload.newWord.trim();
  const newWordList = newWordStr.split(" ");
  
  if (newWordList.length == 1) {
    return state.updateIn(["objects", wordId], word => {
                  return word.set("wordStr", newWordStr);
                });
    
  } else if (newWordList.length < 1) {
    return state.updateIn(["objects", sentenceId, "words"], mp => {
		  return words.delete(wordIdx);
		})
		.update("objects", mp => mp.delete(wordId));

  } else if (newWordList.length > 1) {
    const newWordObjs = List(newWordList.map(w => Word(w, sentenceId)));
    const firstWordId = newWordObjs.getIn([0, "id"]);

    const newState = state.updateIn(["objects", sentenceId, "words"], lst => {
                            return lst.delete(wordIdx);
                          })
			  .update("objects", mp => mp.delete(wordId));

    return newState.update("objects", mp => {
		     const newWordMapping = Map(newWordObjs.reduce((obj, w) => {
		       obj[w.get("id")] = w;
		       return obj;
		     }, {}));
		     return mp.merge(newWordMapping);
                   })
		   .updateIn(["objects", sentenceId, "words"], lst => {
                      return lst.splice(wordIdx, newWordObjs.length, ...newWordObjs);
                   })
		   .set("focused", firstWordId);
    
  } else {
    return state;
  }
}
