import _ from "lodash";
import { Map, List } from "immutable";
import uuid4 from "uuid4";


const punctEndRe = new RegExp("[;:,.-?!]$");

function Sentence (sentenceStr, order) {
  const id = uuid4();
  const type = "Sentence";
  const words = List(sentenceStr.split(" ")
				.map((w, ord) => Word(w, id, ord)));
  const size = words.size;
  
  return Map({ id, sentenceStr, words, size, type, order });
};

function Word (wordString, parentId, order) {
  let wordStr = wordString.toLowerCase();
  let endPunctuation = "";
  const punctEnd = punctEndRe.exec(wordStr);

  if (punctEnd != null) {
    wordStr = wordStr.slice(0, -1);
    endPunctuation = punctEnd[0];
  }

  const id = uuid4();
  const size = wordStr.length;
  const active = true;
  const type = "Word";

  return Map({ id,
	       wordStr,
	       endPunctuation,
	       parentId,
	       size,
	       active,
	       type,
	       order });
}

export {
  Sentence,
  Word
};
