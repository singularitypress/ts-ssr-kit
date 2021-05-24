import * as React from "react";
import serialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import Routes from "../Routes";

// {14}
export const renderer = (req: any, store: any, serverContext: any) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={serverContext}>
        <React.Fragment>
          {renderRoutes(Routes)}
        </React.Fragment>
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  // {2}
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        ${helmet.title.toString()}
        <meta name="description" content="An isomorphic React application."/>
        <meta name="robots" content="index,follow"/>
        <meta name="theme-color" content="#FFF"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Looking for work"/>
        <meta property="og:site_name" content=""/>
        <meta property="og:description" content=""/>
        <meta property="og:url" content=""/>
        <meta property="og:image" content=""/>

        <meta name="twitter:card"/>
        <meta name="twitter:site"/>
        <meta name="twitter:title" content=""/>
        <meta name="twitter:description" content=""/>
        <meta name="twitter:image:alt"/> 
        <meta name="twitter:image:width"/>
        <meta name="twitter:image:height"/>
        <meta name="twitter:image" content=""/>
        <link rel="stylesheet" href="bundle.css" type="text/css" media="all">
        <link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INIT = ${serialize(store.getState())}</script>
        <script async defer src="bundle.js"></script>
      </body>
    </html>
  `;
};
