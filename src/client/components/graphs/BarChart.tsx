import * as React from "react";
import { max, range, scaleBand, scaleLinear } from "d3";
import { IBarChartProps } from "../../../types";

export const BarChart = (props: IBarChartProps) => {
  const { x = 420, y = 20, data, barBackground } = props;

  const xScale =
    scaleLinear()
      .domain([0, max(data)])
      .range([0, x]);

  const yScale =
    scaleBand()
      .domain(range(data.length).map((d) => `${d}`))
      .range([0, y * data.length]);

  const bar = (barAttr: any, textAttr: any, d: number, i: number) => {
    return (
      <g key={d} transform={`translate(0,${yScale(`${i}`)})`}>
        <rect {...barAttr}>
        </rect>
        <text {...textAttr}>
          {d}
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
    return (
      <svg {...svgStyle}>
        {
          data.map((d, i) => {
            const barAttr = {
              fill: barBackground,
              width: xScale(d),
              height: yScale.bandwidth() - 1,
            };
            const textAttr = {
              fill: "white",
              x: xScale(d) - 3,
              y: yScale.bandwidth() / 2,
              dy: "0.35em",
            };
            return bar(barAttr, textAttr, d, i);
          })
        }
      </svg>
    );
  };

  return (
    <div className="chart">
      {drawChart()}
    </div>
  );
};
