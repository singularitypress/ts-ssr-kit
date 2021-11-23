import React from "react";
import express from "express";
import compression from "compression";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";

import { App } from "./App";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

app.use(express.static("public"));

const env =
  process.argv.pop() === "--MODE=dev" ? "development" : "production.min";

app.get("*", (req, res) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  const html = ReactDOMServer.renderToString(
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="/tailwind.css" />
        <link rel="stylesheet" href="/main.css" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body className="content" {...bodyAttrs}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
        <script
          crossOrigin="true"
          src={`https://unpkg.com/react@17/umd/react.${env}.js`}
        ></script>
        <script
          crossOrigin="true"
          src={`https://unpkg.com/react-dom@17/umd/react-dom.${env}.js`}
        ></script>
        <script async defer src="/bundle.js"></script>
        {helmet.script.toComponent()}
      </body>
    </html>,
  );
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT);
