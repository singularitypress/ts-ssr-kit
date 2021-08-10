import React from "react";
import { NotFoundPageProps } from "../../types";

const _NotFoundPage = ({ staticContext = {} }: NotFoundPageProps) => {
  staticContext.notFound = true; // {16}
  return <h1>Oops, page not found</h1>;
};

export const NotFoundPage = {
  component: _NotFoundPage,
  title: "404 Not Found",
};
