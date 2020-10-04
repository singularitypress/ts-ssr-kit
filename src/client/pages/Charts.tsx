import Axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { BarChart } from "../components";
import { Container } from "../components/atomic";

const { useState, useEffect } = React;

const GENERIC_CSV = "https://docs.google.com/spreadsheets/d/1bMmFqj3pjrEIt_mLgfr0DncaUnByTbNDV1_Netevds0/gviz/tq?tqx=out:csv";
const ALPHABET_CSV = "https://docs.google.com/spreadsheets/d/1NXhVJUqllIj1cgW0AHjPqrTQusfrzcx-eoFcxNq4f04/gviz/tq?tqx=out:csv";

const _Charts = () => {
  const [csvData, setData] = useState("");
  const [alphabetData, setAlphabetData] = useState("");
  useEffect(() => {
    Axios.get(GENERIC_CSV).then((res) => { setData(res.data); });
    Axios.get(ALPHABET_CSV).then((res) => { setAlphabetData(res.data); });
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>D3 Charts</title>
      </Helmet>
      <Container>
        <BarChart x={400} y={30} data={csvData} barBackground={"darkgreen"} />
      </Container>
    </React.Fragment>
  );
};

export const Charts = { component: _Charts, title: "D3 Charts" };
