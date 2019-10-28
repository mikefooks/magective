import Mousetrap from "mousetrap";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import MainDisplay from "./components/MainDisplay.jsx";
import store from "./state_mgmt/store";
import style from "./styles/main.scss";

const wrapper = document.getElementById("container");

ReactDOM.render(
  (<Provider store={ store }>
   <MainDisplay />
   </Provider>
  ), wrapper
);

Mousetrap.bind(["meta+h", "alt+h"], (e, combo) => {
  console.log(combo);
});

Mousetrap.bind(["meta+j", "alt+j"], (e, combo) => {
  console.log(combo);
});

Mousetrap.bind(["meta+k", "alt+k"], (e, combo) => {
  console.log(combo);
});

Mousetrap.bind(["meta+l", "alt+l"], (e, combo) => {
  console.log(combo);
});

