import React from "react";
import { axisLeft, create, ScaleLinear } from "d3";
import { convertArr } from "../../../utils";
import { Ticks } from "./Ticks";

interface IProps {
  y: ScaleLinear<number, number, never>;
  fontSize?: number;
}

export const YAxis = (props: IProps) => {
  const { y, fontSize } = props;

  const node =
    create("g")
      .call(axisLeft(y))
      .node();

  const vertPath = node.querySelector("path").getAttribute("d");
  const tickNodes = convertArr(node.querySelectorAll("g")) as HTMLElement[];

  return (
    <g fill="none" fontSize={fontSize || 10} textAnchor="end">
      <path className="domain" stroke="currentColor" d={vertPath} />
      <Ticks tickNodes={tickNodes} />
    </g>
  );
};
