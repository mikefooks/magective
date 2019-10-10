import MainDisplay from "./components/MainDisplay.jsx";
import store from "./state_mgmt/store";
import style from "./styles/main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";


const wrapper = document.getElementById("container");

ReactDOM.render(
  (<Provider store={ store }>
   <MainDisplay />
   </Provider>
  ), wrapper
);



