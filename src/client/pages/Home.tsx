import React from "react";
import { Helmet } from "react-helmet";
import { Base } from "../templates";

export const Home = () => {
  return (
    <Base>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container mx-auto">
        Home
      </div>
    </Base>
  );
};
