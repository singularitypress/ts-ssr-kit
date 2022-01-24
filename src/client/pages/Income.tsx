import { Line, ResponsiveLineCanvas, ResponsiveLine } from "@nivo/line";
import { request, gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../components";
import { API } from "../content";
import { Base } from "../templates";
import { datetimeNormalization } from "../utils";

interface IData {
  x: string;
  y: number | null;
}

export const Income = {
  route: "/income",
  component: () => {
    const [positive, setPositive] = useState<IData[]>([]);
    const [negative, setNegative] = useState<IData[]>([]);

    useEffect(() => {
      const q = gql`
        query {
          transactions {
            ...datum
          }
        }
  
        fragment datum on Transaction {
          x: date,
          y: amount
        }
      `;

      request(API.LOCAL, q)
        .then((res) => {
          const combinedData = (res.transactions as IData[])
            .map(({ x, y }) => ({
              y: (y || 0),
              x: datetimeNormalization(new Date(`${x}`), "YYYY-MM-DD"),
            }))
            .reduce((currList, currTx) => {
              if (currList.length === 0) {
                return [currTx];
              } else {
                if (
                  new Date(currList[currList.length - 1].x).getMonth() ===
                  new Date(currTx.x).getMonth()) {
                  const newTx = {
                    ...currList[currList.length - 1],
                    y: (currList[currList.length - 1].y || 0) + currTx.y,
                  };
                  currList[currList.length - 1] = newTx;
                  return currList;
                } else return [...currList, currTx];
              }
            }, [] as IData[]);

          setPositive(
            combinedData.reduce((prev, curr) => {
              return [
                ...prev,
                (curr.y || 0) >= 0 ? curr : ({ ...curr, y: null }),
              ];
            }, [] as IData[]),
          );
          setNegative(
            combinedData.reduce((prev, curr) => {
              return [
                ...prev,
                (curr.y || 0) < 0 ? curr : ({ ...curr, y: null }),
              ];
            }, [] as IData[]),
          );
        });
    }, []);

    return (
      <Base>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="container mx-auto">
          <div className="pt-4 mb-4 text-center">
            <Heading variant="h1">Brighthouse</Heading>
          </div>
          {
            negative.length > 0 && positive.length > 0 && !!(document)
              ? (
                <div className="h-screen">
                  <ResponsiveLineCanvas
                    margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                    enableSlices='x'
                    data={[
                      {
                        id: "positive",
                        data: positive,
                      },
                      {
                        id: "negative",
                        data: negative,
                      },
                    ]}
                    colors={["rgb(97, 205, 187)", "rgb(244, 117, 96)"]}
                    xScale={{
                      type: "time",
                      format: "%Y-%m-%d",
                      useUTC: false,
                      precision: "day",
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                      type: "linear",
                      stacked: false,
                      min: -2000,
                    }}
                    axisLeft={{
                      legend: "Income",
                      legendOffset: 12,
                    }}
                    axisBottom={{
                      legend: "Pay Date",
                      format: "%b %d %Y",
                      legendOffset: -12,
                    }}
                    theme={{
                      background: "#3f3d3d",
                      textColor: "#FFF",
                      tooltip: {
                        container: {
                          background: "#121212",
                        },
                      },
                    }}
                    curve={"monotoneX"}
                    pointSize={3}
                    pointBorderWidth={1}
                    pointBorderColor={{
                      from: "color",
                      modifiers: [["darker", 0.3]],
                    }}
                    enableArea={true} />
                </div>
              )
              : <></>
          }
        </div>
      </Base>
    );
  },
};
