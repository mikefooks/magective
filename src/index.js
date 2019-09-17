import MainDisplay from "./MainDisplay.jsx";
import style from "./styles.scss";
import React from "react";
import ReactDOM from "react-dom";


const wrapper = document.getElementById("container");

console.log(wrapper);
console.log(MainDisplay);

ReactDOM.render(<MainDisplay />, wrapper);



