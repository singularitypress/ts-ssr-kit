import React from "react";
import { area, create, ScaleLinear, ScaleTime } from "d3";

interface IData {
  value: number;
  date: Date;
}

interface IProps {
  data: IData[];
  x: ScaleTime<number, number, never>,
  y: ScaleLinear<number, number, never>,
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export const AreaShape = (props: IProps) => {
  const { data, x, y, fill, stroke, strokeWidth } = props;

  const areaCalc =
      area()
        .x((d: any) => x((d as IData).date))
        .y0(y(0))
        .y1((d: any) => y((d as IData).value));

  const areaShape =
    create("path")
      .datum(data)
      .attr("d", (areaCalc as any))
      .node()
      .getAttribute("d");

  return (
    <path fill={fill || "#cce5df"} stroke={stroke || "#69b3a2"} strokeWidth={strokeWidth || 1.5} d={areaShape}></path>
  );
};
