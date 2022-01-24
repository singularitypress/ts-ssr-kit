import React from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../components";
import { Base } from "../templates";

export const Games = {
  route: "/games",
  component: () => {
    return (
      <Base>
        <Helmet>
          <title>Games</title>
        </Helmet>
        <div className="container mx-auto">
          <div className="pt-4 mb-4 text-center">
            <Heading variant="h1">Games</Heading>
          </div>
        </div>
      </Base>
    );
  },
};
