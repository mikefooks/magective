import _ from "lodash";


let wordCounter = 0;
let sentenceCounter = 1000;

class Sentence {
  constructor (sentence) {
    this.key = sentenceCounter++;
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
    this.key = wordCounter++;
    this.word = word;
    this.len = word.length;
  }
}

export {
  Sentence,
  Word
};
