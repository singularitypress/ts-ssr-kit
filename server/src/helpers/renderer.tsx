import * as React from "react";
import { renderToString } from "react-dom/server";
import Home from "../client/components/Home";

export default () => {
  const content = renderToString(<Home />);
  const HTML = `
    <html>
      <head>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="js/bundle.js"></script>
      </body>
    </html>
  `;
  return HTML;
};
