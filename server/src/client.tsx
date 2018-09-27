/*
  Startup point for the clientside application
*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./client/components/Home";

const root = document.querySelector("#root");

ReactDOM.hydrate(<Home />, root);
