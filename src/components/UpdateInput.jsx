import React from "react";
import { connect } from "react-redux";

import { changeUpdateInput } from "../state_mgmt/actions";


const mapStateToProps = (state, ownProps) => {
  const inputValue = state.get("updateInputValue");
  return { inputValue };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeHandler: function (evt) {
      return dispatch(changeUpdateInput(evt.target.value));
    }
  }
};

const UpdateInput = ({ changeHandler, inputValue, wordId }) => {
  const inputId = "input-" + wordId;

  return (
    <input type="text" id={ inputId }
	         className="updateInput mousetrap"
	         value={ inputValue }
	         onChange={ changeHandler.bind(this) } />
  );
};

export default connect(mapStateToProps,
		                   mapDispatchToProps)(UpdateInput);
