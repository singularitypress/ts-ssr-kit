import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import Home from "./client/components/Home";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: any, res: any) => {
  const content = renderToString(<Home />);
  res.send(content);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
