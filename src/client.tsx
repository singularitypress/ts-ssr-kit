/*
  Startup point for the clientside application
*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Routes from "./Routes";
import reducers from "./client/reducers";

// {7}
const axiosInstance = axios.create({
  baseURL: "/api",
});

/**
 * {2}
 * {7a}
 */
const store = createStore(
  reducers,
  window.INIT,
  applyMiddleware(thunk.withExtraArgument(axiosInstance)),
);

const root = document.querySelector("#root");

/**
 * {3}
 */
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        {renderRoutes(Routes)}
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  root,
);
