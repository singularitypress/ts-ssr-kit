import React from "react";
import { extent, max, scaleLinear, scaleTime } from "d3";
import { AreaShape } from "./AreaShape";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

interface IProps {
  data?: {
    value: number;
    date: Date;
  }[]
}

export const AreaChart = (props: IProps) => {
  const { data } = props;

  const margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const x =
    scaleTime()
      .domain(extent(data, (d) => d.date))
      .range([0, width]);

  const y =
    scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([height, 0]);

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis x={x} />
        <YAxis y={y} />
        <AreaShape fill="lightblue" stroke="steelblue" x={x} y={y} data={data} />
      </g>
    </svg>
  );
};
