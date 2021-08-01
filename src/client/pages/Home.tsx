import * as React from "react";
import { Helmet } from "react-helmet";
import { createClient } from "graphql-ws";

import { Hero } from "../components";
import { Button } from "../components/atomic";
import { wsQuery } from "../utils";
import { IRes, ITransaction } from "../../types";

const { useState, useEffect } = React;

interface IQueryArgs {
  startDate: string
  endDate: string
  include: string[]
  exclude: string[]
  account: string
  institution: string
  monthly: boolean
}

const _Home = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [keyword, setKeyword] = useState("");
  const [fragment, setFragment] = useState(["description", "amount", "date"]);

  const query = `
    {
      transactions(include: "${keyword}") {
        ...transactionInfo
      }
    }
    fragment transactionInfo on Transaction {
      ${fragment.join(",")}
    }`;
  const next = (res: IRes) => { setTransactions(res.data.transactions); console.log(transactions); };

  useEffect(() => {
    console.log(transactions);
  });

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Hero video={{ src: "https://i.imgur.com/FvaJnWc.mp4" }} height="100vh">
        <h1 className="prose prose-headline text-center">Welcome Home</h1>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input style={{ padding: "1rem", borderRadius: "999px", color: "#333" }} type="text" onChange={(e) => setKeyword(e.target.value)} />

          <br />
          <Button onClick={() => wsQuery(query, next)}>graphql check</Button>
        </form>
      </Hero>
    </>
  );
};

export const Home = {
  component: _Home,
  title: "Home",
  path: "/",
  exact: true,
};
