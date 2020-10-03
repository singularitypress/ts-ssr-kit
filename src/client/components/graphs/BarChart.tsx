import * as React from "react";
import { max, scaleLinear } from "d3";
import { IBarChartProps } from "../../../types";

export const BarChart = (props: IBarChartProps) => {
  const { x, y, data } = props;

  const xScale = scaleLinear().domain([0, max(data)]).range([0, x]);

  const bar = (insertedStyles: React.CSSProperties, text: string) => {
    const barStyle: React.CSSProperties = {
      font: "10px sans-serif",
      textAlign: "right",
      color: "white",
    };
    return <div key={text} style={{ ...barStyle, ...insertedStyles }}>{text}</div>;
  };

  const drawChart = () => {
    return data.map((d) => {
      return bar({ background: "coral", padding: "3px", margin: " 1px", width: `${xScale(d)}px` }, `${d}`);
    });
  };

  return (
    <div className="chart">
      {drawChart()}
    </div>
  );
};
