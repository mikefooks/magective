import Mousetrap from "mousetrap";
import store from "./state_mgmt/store.js";
import { shiftFocus,
	 toggleEditMode,
	 updateEditedWord,
	 deleteWord,
	 DIRECTION }
from "./state_mgmt/actions.js";


Mousetrap.bind(["meta+h", "alt+h"], () => {
  store.dispatch(shiftFocus(DIRECTION.LEFT));
});

Mousetrap.bind(["meta+j", "alt+j"], () => {
  store.dispatch(shiftFocus(DIRECTION.DOWN));
});

Mousetrap.bind(["meta+k", "alt+k"], () => {
  store.dispatch(shiftFocus(DIRECTION.UP));
});

Mousetrap.bind(["meta+l", "alt+l"], () => {
  store.dispatch(shiftFocus(DIRECTION.RIGHT));
});

Mousetrap.bind(["meta+enter", "alt+enter"], (e, combo) => {
  const state = store.getState();
  const wordId = state.get("focused");  
  const inputEl = document.getElementById("input-" + wordId);
  
  if (!state.get("editMode")) {
    store.dispatch(toggleEditMode());
    inputEl.focus();

  } else {
    store.dispatch(updateEditedWord(inputEl.value, wordId));
    store.dispatch(toggleEditMode());
    inputEl.value = "";
    inputEl.blur();
  }
});

Mousetrap.bind(["meta+space", "alt+space"], (e, combo) => {
  const inputEl = document.getElementById("sentence-input");
  inputEl.focus();
});

/*
This is pending.

Mousetrap.bind(["meta+b", "alt+b"], (e, combo) => {
  const state = store.getState();
  const focusedId = state.get("focused");
  const focusedChunk = state.getIn(["objects", focusedId]);
  store.dispatch(deleteWord(focusedId));
});
*/
