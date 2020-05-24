import * as React from "react";
import * as serialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "../Routes";

export const renderer = (req: any, store: any) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <React.Fragment>
          {renderRoutes(Routes)}
        </React.Fragment>
      </StaticRouter>
    </Provider>,
  );
  /**
   * {2}
   */
  return `
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TypeScript SSR Kit</title>
        <meta name="description" content=""/>
        <meta name="robots" content="index,follow"/>
        <meta name="theme-color" content="#FFF"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Personal Banking, Scotiabank"/>
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
        <link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.6.3/dist/css/foundation.min.css" integrity="sha256-ogmFxjqiTMnZhxCqVmcqTvjfe1Y/ec4WaRj/aQPvn+I=" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.6.3/dist/css/foundation.min.css" integrity="sha256-ogmFxjqiTMnZhxCqVmcqTvjfe1Y/ec4WaRj/aQPvn+I=" crossorigin="anonymous">
        <link rel="stylesheet" href="bundle.css" type="text/css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INIT = ${serialize(store.getState())}</script>
        <script defer src="bundle.js"></script>
      </body>
    </html>
  `;
};
