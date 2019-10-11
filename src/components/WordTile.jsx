import React from "react";

import store from "../state_mgmt/store";


class WordTile extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="aWord">
	  <h1>{this.props.word}</h1>
      </div>
    );
  }
}

export default WordTile
