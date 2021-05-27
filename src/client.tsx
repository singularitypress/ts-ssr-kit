/*
  Startup point for the clientside application
*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
const root = document.querySelector("#root");

/**
 * {3}
 */
ReactDOM.hydrate(
  <BrowserRouter>
    <>
      {renderRoutes(Routes)}
    </>
  </BrowserRouter>,
  root,
);
