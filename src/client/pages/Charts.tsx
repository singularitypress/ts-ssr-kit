import Axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { BarChart } from "../components";

const { useState, useEffect } = React;

const url = "https://docs.google.com/spreadsheets/d/1bMmFqj3pjrEIt_mLgfr0DncaUnByTbNDV1_Netevds0/gviz/tq?tqx=out:csv";

const _Charts = () => {
  const [csvData, setData] = useState("");
  useEffect(() => {
    Axios.get(url).then((res) => { setData(res.data); });
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <BarChart x={400} y={30} data={csvData} barBackground={"darkgreen"} />
    </React.Fragment>
  );
};

export const Charts = { component: _Charts, title: "D3 Charts" };
