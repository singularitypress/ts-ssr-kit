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

  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <Container>
        <Lazy condition={!!csvData}>
          <h1 className="text-center text-2xl">The relative frequency of letters in the English language</h1>
          <BarChart width={csvData ? window.innerWidth : 500} height={700} data={csvData} barBackground={"steelblue"} />
        </Lazy>
      </Container>
    </React.Fragment>
  );
};

export const Charts = { component: _Charts };
