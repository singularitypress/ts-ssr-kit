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

const env = process.argv.pop() === "--MODE=dev" ? "development" : "production";

app.get("*", (req, res) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  const html = ReactDOMServer.renderToString(
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div className='content'>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </div>
        <script crossOrigin='true' src={`https://unpkg.com/react@17/umd/react.${env}.js`}></script>
        <script crossOrigin='true' src={`https://unpkg.com/react-dom@17/umd/react-dom.${env}.js`}></script>
        <script async defer src='/bundle.js'></script>
      </body>
    </html>,
  );
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT);
