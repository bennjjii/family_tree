import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App";
import "./index_new.css";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
