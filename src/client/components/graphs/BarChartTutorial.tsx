import * as React from "react";
import { max, range, scaleBand, scaleLinear } from "d3";

// {19}
export const BarChart = (props: {x: number; y: number; data: number[]; barBackground: string;}) => {
  const { x = 420, y = 20, data, barBackground } = props; // {19a}

  // {19b}
  const xScale =
    scaleLinear()
      .domain([0, max(data)])
      .range([0, x]);

  // {19c}
  const yScale =
    scaleBand()
      .domain(range(data.length).map((d) => `${d}`))
      .range([0, y * data.length]);

  const bar = (d: number, i: number) => {
    const barAttr = {
      fill: barBackground,
      width: xScale(d),
      height: yScale.bandwidth() - 1,
    };
    const textAttr = {
      fill: "white",
      x: xScale(d) - (y / 2), // {19d}
      y: yScale.bandwidth() / 2,
      dy: "0.35em",
    };
    const barPosition = yScale(`${i}`);
    return (
      <g key={d} transform={`translate(0,${barPosition})`}>
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
            return bar(d, i);
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
