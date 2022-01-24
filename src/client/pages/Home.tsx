import React from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../components";
import { Base } from "../templates";

export const Home = {
  route: "/",
  component: () => {
    return (
      <Base>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="container mx-auto">
          <div className="pt-4 mb-4 text-center">
            <Heading variant="h1">Brighthouse</Heading>
          </div>
        </div>
      </Base>
    );
  },
};
