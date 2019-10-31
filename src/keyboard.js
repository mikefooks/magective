import Mousetrap from "mousetrap";
import store from "./state_mgmt/store.js";
import { shiftFocus,
	 toggleEditMode,
	 DIRECTION } from "./state_mgmt/actions.js";


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
  store.dispatch(toggleEditMode());
});
