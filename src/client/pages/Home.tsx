import axios from "axios";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Hero } from "../components/Hero";
import { Button } from "../components/atomic/Button";

interface ITransaction {
  description: string;
  amount: number;
  date: string;
};

const { useState, useEffect } = React;

const _Home = () => {
  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log(transactions);
  });

  const requestTransactions = () => {
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      data: { query: `{\n  transactions(include: "${keyword}") {\n    ...transactionInfo\n  }\n}\n\nfragment transactionInfo on Transaction {\n  description, amount, date\n}`, variables: null },
    }).then((res) => {
      setTransactions(res.data.data.transactions);
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
        <Button onClick={requestTransactions}>graphql check</Button>
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
