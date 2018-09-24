const express = require("express");
const React = require("react");
const renderToString = require("react-dom/server").renderToString;
import Home from "./client/components/Home";

const app = express();

app.get("/", (req: any, res: any) => {
  const content = renderToString(<Home />);
  res.send(content);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
