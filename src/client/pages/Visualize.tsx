import { timeParse } from "d3";
import React from "react";
import { Helmet } from "react-helmet";
import { IRes } from "../../types";
import { AreaChart } from "../components/data-visualization";
import { Button } from "../components/atomic";
import { wsQuery } from "../utils";

const { useState } = React;

interface IData {
  value: number;
  date: Date;
}

const _Visualize = () => {
  const [keyword, setKeyword] = useState("");
  const [fragment, setFragment] = useState(["description", "amount", "date"]);
  const [data, setData] = useState([] as IData[]);

  const query = `
    {
      transactions(${keyword}) {
        ...transactionInfo
      }
    }
    fragment transactionInfo on Transaction {
      ${fragment.join(",")}
    }`;

  const next = (res: IRes) => {
    setData(res.data.transactions.map((d) => {
      return {
        value: d.amount,
        date: timeParse("%m/%d/%Y")(d.date),
      };
    }));
  };

  const renderChart = () => {
    if (data.length > 0) {
      return <AreaChart data={data} />;
    } else return <></>;
  };

  return (
    <>
      <Helmet>
        <title>Viz</title>
      </Helmet>
      <div className="container theme-cards">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="keyword">Filter the search by keyword:</label>
            <input
              type="text"
              name="keyword"
              id="keyword"
              onChange={(e) => setKeyword(`include: "${e.target.value}"`)}
              style={{ padding: "1rem", borderRadius: "999px", color: "#333" }}
              required />
          </div>
          <div>
            <Button onClick={() => wsQuery(query, next)}>Search</Button>
          </div>
        </form>
        {renderChart()}
      </div>
    </>
  );
};

export const Visualize = {
  component: _Visualize,
  title: "Visualize",
  path: "/viz",
};
