import Axios from "axios";
import * as React from "react";
import { Lazy } from "../../components/atomic";
import { PieChart } from "../graphs";

const { useState, useEffect } = React;

const CSV = "https://docs.google.com/spreadsheets/d/1a9i0ehNCUr9UBKaV5DERiUEsaAYW7c5W9xhEKPsDP3A/gviz/tq?tqx=out:csv";

export const PiesGraph = () => {
  const [csvData, setData] = useState("");
  useEffect(() => {
    if (!csvData) Axios.get(CSV).then((res) => { setData(res.data); });
  });

  return (
    <Lazy condition={!!csvData}>
      <h1 className="text-center text-2xl">Popularity of pies</h1>
      <PieChart data={csvData} />
    </Lazy>
  );
};
