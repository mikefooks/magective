import _ from "lodash";
import uuid4 from "uuid4";


class Sentence {
  constructor (sentence) {
    this.id = uuid4();
    this.sentenceStr = sentence;
    this.words = _.map(sentence.split(" "),
		       w => new Word(_.toLower(w)), this.id);
    this.len = this.words.length;
  }

  getTokens () {
    return this.words;
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

export {
  Sentence,
  Word
};
