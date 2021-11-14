import React from "react";
import { Routes, Route } from "react-router";
import { Home } from "./client/pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />
    </Routes>
  );
};
