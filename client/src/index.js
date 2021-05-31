import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./index_new.css";
import App from "./App";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
