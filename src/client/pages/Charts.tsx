import * as React from "react";
import { Helmet } from "react-helmet";
import { BarChart, Hero } from "../components";

const _Charts = () => {
  const data = [4, 8, 15, 16, 23, 42];
  const x = 400;
  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <BarChart x={x} data={data} />
    </React.Fragment>
  );
};

export const Charts = { component: _Charts, title: "D3 Charts" };
