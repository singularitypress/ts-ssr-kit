import React from "react";
import { Helmet } from "react-helmet";
import { FormField, Heading, Input } from "../components";
import { Base } from "../templates";

export const Home = () => {
  return (
    <Base>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="pt-4 mb-4 text-center">
          <Heading variant="h1">Brighthouse</Heading>
        </div>
        <form className="grid grid-cols-2 gap-6">
          <FormField label="Search">
            <Input type="text" />
          </FormField>
        </form>
      </div>
    </Base>
  );
};
