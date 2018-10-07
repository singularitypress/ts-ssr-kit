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
    </Provider>
  );
  return `
    <html>
      <head>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="js/bundle.js"></script>
      </body>
    </html>
  `;
};
