import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import Home from "./client/components/Home";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req: any, res: any) => {
  const content = renderToString(<Home />);
  const HTML = `
    <html>
      <head>
      </head>
      <body>
        ${content}
        <script src="js/bundle.js"></script>
      </body>
    </html>
  `;
  res.send(HTML);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
