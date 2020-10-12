import Axios from "axios";
import * as React from "react";
import { BarChart } from "../../components";
import { Lazy } from "../../components/atomic";

const { useState, useEffect } = React;

const CSV = "https://docs.google.com/spreadsheets/d/1NXhVJUqllIj1cgW0AHjPqrTQusfrzcx-eoFcxNq4f04/gviz/tq?tqx=out:csv";

export const PiesGraph = () => {
  const [csvData, setData] = useState("");
  useEffect(() => {
    if (!csvData) Axios.get(CSV).then((res) => { setData(res.data); });
  });

  return (
    <Lazy condition={!!csvData}>
      <h1 className="text-center text-2xl">The relative frequency of letters in the English language</h1>
      <BarChart width={csvData ? window.innerWidth : 500} height={700} data={csvData} barBackground={"steelblue"} />
    </Lazy>
  );
};
