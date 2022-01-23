import React from "react";
import { Routes, Route } from "react-router";
import { About, Home, Income, Spending } from "./client/pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/spending" element={<Spending />} />
      <Route path="/income" element={<Income />} />
    </Routes>
  );
};
