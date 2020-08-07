import * as React from "react";
import { Helmet } from "react-helmet";

const _Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>{"I'm the GOAT home component"}</div>
    </React.Fragment>
  );
};

export const Home = { component: _Home, title: "Home" };
