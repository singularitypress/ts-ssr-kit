import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormField, Heading, Input } from "../components";
import { API } from "../content";
import { Base } from "../templates";

export const Home = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [inclusionTerms, setInclusionTerms] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const include = `["${inclusionTerms.split(", ").join("\",\"")}"]`;
    const exclude = `["${[
      "7027",
      "Payment BNS",
      "VOUCHER/RETURN",
      "ANNUAL FEE REVERSAL",
      "pmtsWA AMT 79.00 UNITED STATES DOLLAR",
      "AMZN Mktp US Amzn.com/billWA AMT 105.98 UNITED STATES DOLLAR",
    ].join("\",\"")}"]`;

    const query = `
      {
        transactions(include: ${include} exclude: ${exclude}) {
          ...transactionInfo
        }
      }
      
      fragment transactionInfo on Transaction {
        description, amount, date, account, institution
      }
    `;

    axios
      .post(API.LOCAL, { query })
      .then((res) => {
        setTransactions(res.data.data);
      });
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <Base>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="pt-4 mb-4 text-center">
          <Heading variant="h1">Brighthouse</Heading>
        </div>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit}>
          <FormField label="Search">
            <Input
              type="text"
              onChange={(e) => {
                setInclusionTerms(`${e?.target.value}`);
              }}/>
          </FormField>
        </form>
      </div>
    </Base>
  );
};
