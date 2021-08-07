import React from "react";
import { attrObj } from "../../../utils";

interface IProps {
  tickNodes: HTMLElement[];
}

export const Ticks = ({ tickNodes }: IProps) => {
  return (
    <>
      {
        tickNodes.map((g, index) => {
          const line = g.querySelector("line");
          const text = g.querySelector("text");
          return (
            <g key={index} {...attrObj(g.attributes)}>
              <line {...attrObj(line.attributes)} />
              <text {...attrObj(text.attributes)}>{text.textContent}</text>
            </g>
          );
        })
      }
    </>
  );
};
