import * as React from "react";
import { Header } from "../components";
import { renderRoutes } from "react-router-config";
import { BaseProps } from "../../types";

// {9}
const _base = (props: BaseProps) => {
  return (
    <React.Fragment>
      <Header />
      <main>
        {renderRoutes(props.route.routes)}
      </main>
    </React.Fragment>
  );
};

export const Base = {
  component: _base,
};
