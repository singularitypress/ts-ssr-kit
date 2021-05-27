import * as React from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/atomic";

const { useState, useEffect } = React;

const _Visualize = () => {
  return (
    <>
      <Helmet>
        <title>Viz</title>
      </Helmet>
      <div className="container theme-cards">
        <form>
          <div>
            <label htmlFor="keyword">Filter the search by keyword:</label>
            <input type="text" name="keyword" id="keyword" required />
          </div>
          <div>
            <Button>Search</Button>
          </div>
        </form>

      </div>
    </>
  );
};

export const Visualize = {
  component: _Visualize,
  title: "Visualize",
  path: "/viz",
};
