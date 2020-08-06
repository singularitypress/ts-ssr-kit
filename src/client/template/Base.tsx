import * as React from "react";
import { Header } from "../components";
import { renderRoutes } from "react-router-config";
import { fetchCurrentUser } from "../actions";
import { BaseProps } from "../../types";
import { Store } from "redux";

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

// {12}
export const Base = {
  component: _base,
  loadData: (store: Store) => store.dispatch(fetchCurrentUser() as any),
};
