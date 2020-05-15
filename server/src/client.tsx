/*
  Startup point for the clientside application
*/

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Routes from "./Routes";
import reducers from "./client/reducers";

const store = createStore(reducers, {}, applyMiddleware(thunk));

const root = document.querySelector("#root");

/*
  We're using .hydrate instead of .render because it's an SSR app and we want to
  update what the server is already rendering versus replacing the DOM node entirely.
  As per stackoverflow:

    If you call ReactDOM.hydrate() on a node that already has this server-rendered markup,
    React will *preserve it and only attach event handlers*, allowing you to have a very
    performant first-load experience.
    Render may change your node if there is a difference between the initial DOM and the
    current DOM. hydrate will only attach event handlers.

    https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16

    TL;DR, only useful for SSR React.
*/

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  root,
);
