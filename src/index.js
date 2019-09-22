import MainDisplay from "./MainDisplay.jsx";
import style from "./styles.scss";
import React from "react";
import ReactDOM from "react-dom";

import "./reducers.js";


const wrapper = document.getElementById("container");

ReactDOM.render(<MainDisplay />, wrapper);



