import React from "react";
import express from "express";
import compression from "compression";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

app.use(express.static("public"));

app.get("*", (req, res) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  );
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT);
