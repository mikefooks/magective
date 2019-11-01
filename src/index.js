import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import MainDisplay from "./components/MainDisplay.jsx";
import store from "./state_mgmt/store";
import keyboard from "./keyboard.js";
import style from "./styles/main.scss";

const wrapper = document.getElementById("container");

ReactDOM.render(
  (<Provider store={ store }>
   <MainDisplay />
   </Provider>
  ), wrapper
);

