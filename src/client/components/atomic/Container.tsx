import React from "react";
import { IContainerProps } from "../../../types";

export const Container = (props: IContainerProps) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
};
