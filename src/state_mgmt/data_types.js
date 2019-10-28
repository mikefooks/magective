import _ from "lodash";
import { Map, List } from "immutable";
import uuid4 from "uuid4";


function Sentence (sentenceStr) {
  const id = uuid4();
  const words = List(sentenceStr.split(" ").map(w => Word(w, id)));
  const size = words.length;
  
  return Map({ id, sentenceStr, words, size });
};

function Word (word, parentId) {
  const id = uuid4();
  const size = word.length;
  const active = true;

  return Map({ id, word, parentId, size, active });
}

/*
class Sentence {
  constructor (sentence) {
    this.id = uuid4();
    this.sentenceStr = sentence;
    this.words = _.map(sentence.split(" "),
		       w => new Word(_.toLower(w)), this.id);
    this.len = this.words.length;
  }
}

class Word {
  constructor (word, sentenceId) {
    this.id = uuid4();
    this.parentId = sentenceId || false;
    this.word = word;
    this.len = word.length;
    this.active = true;
  }

  retire () {
    this.active = false;
  }

  activate () {
    this.active = true;
  }
}

*/

export {
  Sentence,
  Word
};
