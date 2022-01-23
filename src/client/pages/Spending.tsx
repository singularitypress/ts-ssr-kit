import { ResponsiveCalendar } from "@nivo/calendar";
import { request, gql } from "graphql-request";
import React, { MouseEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../components";
import { API } from "../content";
import { Base } from "../templates";
import { datetimeNormalization } from "../utils";
import { ITransaction } from "../types";

interface IData {
  description?: string;
  day: string;
  value: number;
}

export const Spending = () => {
  const [data, setData] = useState<IData[]>([]);

  const accounts = [
    {
      label: "AMEX",
      value: "amex",
    },
    {
      label: "PC Mastercard",
      value: "mastercard",
    },
    {
      label: "VISA",
      value: "visa",
    },
  ];

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const { value: account } = e.target as HTMLButtonElement;
    const q = gql`
      query {
        transactions(max: 0, account: ["${account}"]) {
          date,
          amount,
          description
        }
      }
    `;

    request(API.LOCAL, q)
      .then((res) => {
        setData(
          (res.transactions as ITransaction[])
            .map(({ description, amount, date }) => ({
              description,
              value: -1 * (amount || 0),
              day: datetimeNormalization(new Date(`${date}`), "YYYY-MM-DD"),
            }))
            .reduce((currList, currTx) => {
              if (currList.length === 0) {
                return [currTx];
              } else {
                if (currList[currList.length - 1].day === currTx.day) {
                  const newTx = {
                    ...currList[currList.length - 1],
                    value: currList[currList.length - 1].value + currTx.value,
                  };
                  currList[currList.length - 1] = newTx;
                  return currList;
                } else return [...currList, currTx];
              }
            }, [] as IData[]),
        );
      });
  };

  const colours = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
  ];

  return (
    <Base>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="pt-4 mb-4 text-center">
          <Heading variant="h1">Brighthouse</Heading>
        </div>
        <div className="flex">
          {
            [
              ...accounts,
              {
                label: "All",
                value: accounts.map(({ value }) => value).join("\",\""),
              },
            ].map(({ label, value }) => (
              <div key={label} className="mr-4">
                <button
                  className="border-2 rounded-full border-theme-accent px-4 py-2 hover:bg-theme-accent hover:text-theme-base"
                  value={value}
                  onClick={handleSubmit}>
                  {label}
                </button>
              </div>
            ))
          }
        </div>
        {
          data.length > 0 && !!(document)
            ? (
              <div className="h-screen">
                <ResponsiveCalendar
                  data={data}
                  from={data[0].day}
                  theme={{
                    textColor: "#FFF",
                    tooltip: {
                      container: {
                        background: "#3f3d3d",
                      },
                    },
                  }}
                  to={ datetimeNormalization(new Date(), "YYYY-MM-DD")}
                  emptyColor="#7d7b7a"
                  colors={colours}
                  margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                  yearSpacing={40}
                  monthBorderColor="#3f3d3d"
                  dayBorderWidth={2}
                  dayBorderColor="#3f3d3d"
                  legends={[
                    {
                      anchor: "top",
                      direction: "row",
                      translateY: 36,
                      itemCount: colours.length,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: "right-to-left",
                    },
                  ]}
                />
              </div>
            )
            : <></>
        }
      </div>
    </Base>
  );
};
