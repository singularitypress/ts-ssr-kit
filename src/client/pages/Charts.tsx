import * as React from "react";
import { Helmet } from "react-helmet";
import { BarChart } from "../components";

const _Charts = () => {
  const data = [4, 8, 15, 16, 23, 42];
  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <BarChart x={400} y={30} data={data} barBackground={"darkgreen"} />
    </React.Fragment>
  );
};

export const Charts = { component: _Charts, title: "D3 Charts" };
