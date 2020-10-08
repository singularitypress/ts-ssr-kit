import * as React from "react";
import { max, scaleBand, scaleLinear, csvParse, autoType } from "d3";
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

  const drawChart = () => {
    return (
      <svg viewBox={`0,0,${width},${height}`}>

      </svg>
    );
  };

  console.log(x.bandwidth());

  return (
    <div className="chart">
      {drawChart()}
    </div>
  );
};
