import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Routes from "../Routes";

export default (req: any) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
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
