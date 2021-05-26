import Axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Container } from "../components/atomic";
import { AlphabetGraph, PiesGraph } from "../components/experience-fragments";

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
        <AlphabetGraph />
        <PiesGraph />
      </Container>
    </React.Fragment>
  );
};

export const Charts = {
  component: _Charts,
  path: "/charts",
};
