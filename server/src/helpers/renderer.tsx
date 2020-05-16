import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "../Routes";

export const renderer = (req: any, store: any) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Routes />
      </StaticRouter>
    </Provider>,
  );
  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.6.3/dist/css/foundation.min.css" integrity="sha256-ogmFxjqiTMnZhxCqVmcqTvjfe1Y/ec4WaRj/aQPvn+I=" crossorigin="anonymous">
        <link rel="stylesheet" href="bundle.css" type="text/css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script defer src="bundle.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/foundation-sites@6.6.3/dist/js/foundation.min.js" integrity="sha256-pRF3zifJRA9jXGv++b06qwtSqX1byFQOLjqa2PTEb2o=" crossorigin="anonymous"></script>
      </body>
    </html>
  `;
};
