import _ from "lodash";
import { Map, List } from "immutable";
import uuid4 from "uuid4";


function Sentence (sentenceStr, order) {
  const id = uuid4();
  const words = List(sentenceStr.split(" ").map((w, ord) => Word(w, id, ord)));
  const size = words.size;
  const type = "Sentence";
  
  return Map({ id, sentenceStr, words, size, type, order });
};

function Word (wordStr, parentId, order) {
  const id = uuid4();
  const size = wordStr.length;
  const active = true;
  const type = "Word";

  return Map({ id, wordStr, parentId, size, active, type, order });
}

export {
  Sentence,
  Word
};
