import * as React from "react";
import { max, range, scaleBand, scaleLinear, csvParse, autoType } from "d3";
import { IBarChartProps } from "../../../types";

interface IDatum {
  name: string;
  value: number;
}

export const BarChart = (props: IBarChartProps) => {
  const { x = 420, y = 20, data, barBackground } = props;
  const parsedData = csvParse(data, autoType);

  const xScale =
    scaleLinear()
      .domain([0, max(parsedData, (d: IDatum) => d.value)])
      .range([0, x]);

  const yScale =
    scaleBand()
      .domain(parsedData.map((d: IDatum) => d.name))
      .range([0, y * parsedData.length]);

  const bar = (d: IDatum, i: number) => {
    const barAttr = {
      fill: barBackground,
      width: xScale(d.value),
      height: yScale.bandwidth() - 1,
    };
    const textAttr = {
      fill: "white",
      x: xScale(d.value) - (y / 2),
      y: yScale.bandwidth() / 2,
      dy: "0.35em",
    };
    const barPosition = yScale(`${d.name}`);
    return (
      <g key={d.name} transform={`translate(0,${barPosition})`}>
        <rect {...barAttr}>
        </rect>
        <text {...textAttr}>
          {d.name}
        </text>
      </g>
    );
  };

  const drawChart = () => {
    const svgStyle = {
      width: x,
      height: yScale.range()[1],
      fontFamily: "sans-serif",
      fontSize: 10,
      textAnchor: "end",
    };
    const bars = (parsedData as IDatum[]).map((d, i) => {
      return bar(d, i);
    });
    return (
      <svg {...svgStyle}>
        {bars}
      </svg>
    );
  };

  return (
    <div className="chart">
      {drawChart()}
    </div>
  );
};
