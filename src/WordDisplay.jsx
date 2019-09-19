import React from "react";


class WordDisplay extends React.Component {
  constructor () {
    super();
  }

  clickHandler () {
    console.log(this);
  }

  render () {
    return (
      <div className="aWord"
	   onClick={this.clickHandler.bind(this)}>
	  <h1>{this.props.word}</h1>
      </div>
    );
  }
}

export default WordDisplay
