import {
  arc,
  autoType,
  csvParse,
  DefaultArcObject,
  pie,
  PieArcDatum,
  scaleOrdinal,
  schemeCategory10,
} from "d3";
import * as React from "react";
import { IPieChartProps } from "../../../types";

interface ISliceProps {
  arcObj: any;
  fill: string;
  innerRadius?: number;
  outerRadius: number;
}

interface IPieProps {
  data: number[];
  radius: number;
}

const Shape = (props: ISliceProps) => {
  const { arcObj, fill, innerRadius = 0, outerRadius } = props;

  const arcDimensions = arc().innerRadius(innerRadius).outerRadius(outerRadius);

  return <path d={arcDimensions(arcObj)} stroke="white" fill={fill} />;
};

const Pie = (props: IPieProps) => {
  const { data, radius } = props;
  const colour = scaleOrdinal(schemeCategory10);
  const _pie = pie();

  const renderSlice = (
    arcObj: PieArcDatum<number | { valueOf(): number }>,
    i: any,
  ) => {
    return (
      <Shape
        key={i}
        outerRadius={radius}
        arcObj={arcObj}
        fill={colour(`${i}`)}
      />
    );
  };

  return <>{_pie(data).map(renderSlice)}</>;
};

export const PieChart = (props: IPieChartProps) => {
  const { data, width = 954, height = 500 } = props;

  const parsedData = csvParse(data, autoType);
  const radius = (Math.min(width, height) * 0.9) / 2;
  const x = width / 2 + height / 4;
  const y = height / 2;

  return (
    <div className="chart">
      <svg width={"100%"} height={height}>
        <g stroke="white" transform={`translate(${x},${y})`}>
          <Pie
            data={Array.prototype.slice
              .call(parsedData)
              .map((d: any) => d.percent)}
            radius={radius}
          />
        </g>
      </svg>
    </div>
  );
};
