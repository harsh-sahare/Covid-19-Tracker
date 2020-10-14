import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { DataLayer, default_state, Reducer } from "./Components";

ReactDOM.render(
  <DataLayer sta={default_state} re={Reducer}>
    <App />
  </DataLayer>,
  document.getElementById("root")
);
