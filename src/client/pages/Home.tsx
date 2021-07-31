import axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { createClient } from "graphql-ws";

import { Hero } from "../components";
import { Button } from "../components/atomic";
import { IRes, ITransaction } from "../../types";

const { useState, useEffect } = React;

const _Home = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [keyword, setKeyword] = useState("");

  const query = `{\n  transactions(include: "${keyword}") {\n    ...transactionInfo\n  }\n}\n\nfragment transactionInfo on Transaction {\n  description, amount, date\n}`;
  const next = (res: IRes) => { setTransactions(res.data.transactions); console.log(transactions); };

  useEffect(() => {
    console.log(transactions);
  });

  const requestTransactions = () => {
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      data: { query, variables: null },
    }).then((res) => {
      setTransactions(res.data.data.transactions);
    });
  };

  const client = createClient({
    url: "ws://localhost:4001/graphql",
  });

  const wsQuery = async () => {
    await new Promise((resolve, reject) => {
      let result: any;
      client.subscribe(
        {
          query,
        },
        {
          next,
          error: reject,
          complete: () => resolve(result),
        },
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Hero video={{ src: "https://i.imgur.com/FvaJnWc.mp4" }} height="100vh">
        <h1 className="prose prose-headline text-center">Welcome Home</h1>
        <input style={{ padding: "1rem", borderRadius: "999px", color: "#333" }} type="text" onChange={(e) => setKeyword(e.target.value)} />
        <br />
        <Button onClick={wsQuery}>graphql check</Button>
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
