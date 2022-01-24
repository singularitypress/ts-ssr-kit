import React from "react";
import { Helmet } from "react-helmet";

export const About = {
  route: "/about",
  component: () => {
    return (
      <>
        <Helmet>
          <title>Aboot</title>
        </Helmet>
        <div>
          About
        </div>
      </>
    );
  },
};
