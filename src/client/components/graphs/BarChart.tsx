import * as React from "react";
import { max, scaleBand, scaleLinear, csvParse, autoType, axisBottom, create, axisLeft } from "d3";
import { IBarChartProps } from "../../../types";

interface IDatum {
  letter: string;
  frequency: number;
}

export const BarChart = (props: IBarChartProps) => {
  const { width = 500, height = 500, data, barBackground } = props;
  const parsedData = csvParse(data, autoType);
  const margin = {
    top: 20,
    right: 0,
    bottom: 30,
    left: 40,
  };

  const x =
    scaleBand()
      .domain(parsedData.map((d: IDatum) => d.letter))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

  const y =
    scaleLinear()
      .domain([0, max(parsedData, (d: IDatum) => d.frequency)])
      .range([height - margin.bottom, margin.top]);

  const xAxis = create("g").call(axisBottom(x));
  const yAxis = create("g").call(axisLeft(y));

  return (
    <div className="chart">
      <svg viewBox={`0,0,${width},${height}`}>
        <g transform={`translate(0,${height - margin.bottom})`} textAnchor="middle" dangerouslySetInnerHTML={{ __html: xAxis.html() }}/>
        <g transform={`translate(${margin.left},0)`} textAnchor="end" dangerouslySetInnerHTML={{ __html: yAxis.html() }}>
        </g>
      </svg>
    </div>
  );
};
