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
    transactions(account: ["visa", "amex", "mastercard"] exclude: ["7027", "Payment BNS", "VOUCHER/RETURN", "ANNUAL FEE REVERSAL", "pmtsWA AMT 79.00 UNITED STATES DOLLAR", "AMZN Mktp US Amzn.com/billWA AMT 105.98 UNITED STATES DOLLAR"]) {
      ...transactionInfo
    }
  }
  
  fragment transactionInfo on Transaction {
    description, amount, date, account, institution
  }`;

  const next = (res: IRes) => {
    setData(res.data.transactions.map((d) => {
      return {
        value: d.amount * -1,
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
