import React from "react";
import { Routes, Route } from "react-router";

export const App = () => {
  return (
    <html>
      <head>
        <title>The App</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
        <script src='/bundle.js'></script>
      </body>
    </html>
  );
};
