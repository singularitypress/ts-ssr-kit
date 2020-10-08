import Axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { BarChart } from "../components";
import { Container, Lazy } from "../components/atomic";

const { useState, useEffect } = React;

const CSV = "https://docs.google.com/spreadsheets/d/1NXhVJUqllIj1cgW0AHjPqrTQusfrzcx-eoFcxNq4f04/gviz/tq?tqx=out:csv";

const _Charts = () => {
  const [csvData, setData] = useState("");
  useEffect(() => {
    if (!csvData) Axios.get(CSV).then((res) => { setData(res.data); });
  });

  const renderChart = () => {
    if (csvData) {
      return <BarChart width={500} height={500} data={csvData} barBackground={"darkgreen"} />;
    } else {
      return <></>;
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <Container>
        <Lazy condition={!!csvData}>
          <BarChart width={csvData ? window.innerWidth : 500} height={500} data={csvData} barBackground={"darkgreen"} />
        </Lazy>
      </Container>
    </React.Fragment>
  );
};

export const Charts = { component: _Charts, title: "D3 Charts" };
