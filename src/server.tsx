import express from "express";
import compression from "compression";
import { renderer } from "./helpers";
import { StaticContext } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;

// {4}
app.use(compression());
// {5}
app.use(express.static("public"));

app.get("*", (req, res) => {
  // {14}
  const serverContext: StaticContext = {};

  // {15}
  const content = renderer(req, serverContext);

  // {18a}
  if (serverContext.url) {
    return res.redirect(301, serverContext.url);
  }

  // {17}
  if (serverContext.notFound) {
    res.status(404);
  }

  res.send(content);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
