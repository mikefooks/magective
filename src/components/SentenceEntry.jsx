import _ from "lodash";

import store from "../state_mgmt/store";
import { sentenceToQuiver } from "../state_mgmt/actions";

import React from "react";


class SentenceEntry extends React.Component {
  constructor () {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (evt) {
    let inputValue = evt.target.previousSibling.value;
    store.dispatch(sentenceToQuiver(inputValue));
    evt.target.previousSibling.value = "";
  }
  
  render () {
    return (
      <div className="sentenceEntry">
	  <input type="text" id="sentenceInput"/>
	  <button onClick={this.handleClick}>Done</button>
      </div>
    );
  }
}

export default SentenceEntry;
