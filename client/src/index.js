import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index_new.css";
//import "./normalize.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
