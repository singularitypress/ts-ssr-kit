import React from "react";
import { axisBottom, create, ScaleTime } from "d3";
import { attrObj, convertArr } from "../../../utils";
import { Ticks } from "./Ticks";

interface IProps {
  x: ScaleTime<number, number, never>,
  fontSize?: number;
}

export const XAxis = (props: IProps) => {
  const { x, fontSize } = props;
  const margin = { top: 10, right: 30, bottom: 30, left: 50 };
  const height = 400 - margin.top - margin.bottom;

  const node =
    create("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x))
      .node();

  const horizontalPath = node.querySelector("path").getAttribute("d");
  const tickNodes = convertArr(node.querySelectorAll("g")) as HTMLElement[];

  return (
    <g transform={`translate(0,${height})`} fill="none" fontSize={fontSize || 10} textAnchor="middle">
      <path className="domain" stroke="currentColor" d={horizontalPath} />
      <Ticks tickNodes={tickNodes} />
    </g>
  );
};
