import _ from "lodash";

import React from "react";
import { connect } from "react-redux";

import WordTile from "./WordTile.jsx";


const mapStateToProps = (state, ownProps) => {
  if (ownProps.role == "board") {
    return { words: state.board.words };
  } else if (ownProps.role == "quiver") {
    return { words: state.quiver.words };
  }
};

class ConnectedWordBoard extends React.Component {
  constructor () {
    super();
  }

  render () {
    let classNames = "wordBoard " + this.props.role,
	tiles = _.map(this.props.words, word => {
	  return <WordTile
		   role={this.props.role}
		   word={word.word}
		   key={word.idx}
		   idx={word.idx} />
	});

    return (
      <div className={classNames}>
	  {tiles}
      </div>
    );
  }
}

const WordBoard = connect(mapStateToProps)(ConnectedWordBoard);

export default WordBoard;
