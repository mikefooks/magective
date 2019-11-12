import Mousetrap from "mousetrap";
import store from "./state_mgmt/store.js";
import { shiftFocus,
	 toggleEditMode,
	 updateEditedWord,
	 addWord,
	 deleteWord,
	 ADD_WORD_INSERT,
	 ADD_WORD_APPEND,
	 DIRECTION }
from "./state_mgmt/actions.js";


function focusAndClear (e, inputId, inputValue="") {
  const inputEl = document.getElementById(inputId);
  inputEl.value = inputValue;
  inputEl.focus();
  if (e.preventDefault) {
    e.preventDefault();
  }
}

Mousetrap.bind(["shift+left"], () => {
  store.dispatch(shiftFocus(DIRECTION.LEFT));
});

Mousetrap.bind(["shift+up"], () => {
  store.dispatch(shiftFocus(DIRECTION.UP));
});

Mousetrap.bind(["shift+down"], () => {
  store.dispatch(shiftFocus(DIRECTION.DOWN));
});

Mousetrap.bind(["shift+right"], () => {
  store.dispatch(shiftFocus(DIRECTION.RIGHT));
});

Mousetrap.bind(["shift+enter"], (e, combo) => {
  // TODO: This should all be the in the reducer.
  // All this state querying and manipulation has
  // little to do with the keyboard.
  const state = store.getState();
  const wordId = state.get("focused");
  const wordStr = state.getIn(["objects", wordId, "wordStr"]);
  const inputEl = document.getElementById("input-" + wordId);
  
  if (!state.get("editMode")) {
    store.dispatch(toggleEditMode());
    inputEl.value = wordStr;
    inputEl.focus();

  } else {
    store.dispatch(updateEditedWord(inputEl.value, wordId));
    store.dispatch(toggleEditMode());
    inputEl.value = "";
    inputEl.blur();
  }
});

Mousetrap.bind(["shift+space"], (e, combo) => {
  focusAndClear(e, "sentence-input");
});

Mousetrap.bind(["shift+backspace"], (e, combo) => {
  const state = store.getState();
  const focusedId = state.get("focused");
  store.dispatch(deleteWord(focusedId));
});

Mousetrap.bind("shift+i", (e, combo) => {
  store.dispatch(addWord(ADD_WORD_INSERT));
  const state = store.getState();
  const focusedKey = state.get("focused");
  focusAndClear(e, "input-" + focusedKey);

});

Mousetrap.bind("shift+a", (e, combo) => {
  store.dispatch(addWord(ADD_WORD_APPEND));
  const state = store.getState();
  const focusedKey = state.get("focused");
  focusAndClear(e, "input-" + focusedKey);
});

