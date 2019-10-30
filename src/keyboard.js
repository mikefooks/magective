import Mousetrap from "mousetrap";
import store from "./state_mgmt/store.js";
import { shiftFocus, DIRECTION } from "./state_mgmt/actions.js";


Mousetrap.bind(["meta+h", "alt+h"], (e, combo) => {
  store.dispatch(shiftFocus(DIRECTION.LEFT));
});

Mousetrap.bind(["meta+j", "alt+j"], (e, combo) => {
  store.dispatch(shiftFocus(DIRECTION.DOWN));
});

Mousetrap.bind(["meta+k", "alt+k"], (e, combo) => {
  store.dispatch(shiftFocus(DIRECTION.UP));
});

Mousetrap.bind(["meta+l", "alt+l"], (e, combo) => {
  store.dispatch(shiftFocus(DIRECTION.RIGHT));
});
