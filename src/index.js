import React from "react";
import ReactDOM from "react-dom";
import  { CssBaseline } from '@material-ui/core';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  rootElement
);
