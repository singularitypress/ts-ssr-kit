import React from "react";
import { Routes, Route } from "react-router";
import * as pages from "./client/pages";

interface IPages {
  [key: string]: {
    route: string;
    component: () => JSX.Element;
  };
}

export const App = () => {
  return (
    <Routes>
      {Object.keys(pages).map((page) => {
        return (
          <Route
            key={(pages as IPages)[page].route}
            path={(pages as IPages)[page].route}
            element={(pages as IPages)[page].component()}
          />
        );
      })}
    </Routes>
  );
};
