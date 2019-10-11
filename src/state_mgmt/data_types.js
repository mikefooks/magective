import _ from "lodash";


class Sentence {
  constructor (sentence) {
    this._sentenceStr = sentence;
    this._words = _.map(sentence.split(" "),
			w => new Word(_.toLower(w)));
    this.len = this._words.length;
  }

  getTokens () {
    return this._words;
  }
}

class Word {
  constructor (word) {
    this.word = word;
    this.len = word.length;
  }
}

export {
  Sentence,
  Word
};
