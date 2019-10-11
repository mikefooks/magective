import React from "react";
import { connect } from "react-redux";

import { switchActivateWord } from "../state_mgmt/actions";


const mapStateToProps = (state, ownProps) => {
  return {
    word: state.words[ownProps.wordId]
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchActivate: function (evt) {
      evt.stopPropagation();
      dispatch(switchActivateWord(ownProps.wordId))
    }
  };
};

class ConnectedWordTile extends React.Component {
  constructor () {
    super();
  }

  render () {
    let wordStr = this.props.word.word,
	active = this.props.word.active ? "active" : "retired";
    
    return (
      <div className="wordTile">
	  <h1 className={active}
	  onClick={this.props.switchActivate}>{wordStr}</h1>
      </div>
    );
  }
}

const WordTile = connect(mapStateToProps,
			 mapDispatchToProps)(ConnectedWordTile);

export default WordTile
