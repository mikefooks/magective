import MainDisplay from "./MainDisplay.jsx";
import store from "./store";
import style from "./styles.scss";

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



