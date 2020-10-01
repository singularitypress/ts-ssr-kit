import * as React from "react";
import { Helmet } from "react-helmet";
import { Hero } from "../components";

const _Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Hero video={{ src: "https://i.imgur.com/FvaJnWc.mp4" }} height="100vh">
        <h1 className="prose prose-headline text-center">Welcome Home</h1>
      </Hero>
    </React.Fragment>
  );
};

export const Home = { component: _Home, title: "Home" };
