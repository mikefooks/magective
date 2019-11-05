import Mousetrap from "mousetrap";
import store from "./state_mgmt/store.js";
import { shiftFocus,
	 toggleEditMode,
	 updateEditedWord,
	 deleteWord,
	 DIRECTION }
from "./state_mgmt/actions.js";


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

Mousetrap.bind(["shift+space"], (e, combo) => {
  const inputEl = document.getElementById("sentence-input");
  inputEl.focus();
});

Mousetrap.bind(["shift+backspace"], (e, combo) => {
  const state = store.getState();
  const focusedId = state.get("focused");
  store.dispatch(deleteWord(focusedId));
});
