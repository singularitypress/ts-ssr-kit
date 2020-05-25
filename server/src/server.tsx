import * as express from "express";
import * as proxy from "express-http-proxy";
import * as compression from "compression";
import { matchRoutes } from "react-router-config";
import { renderer, setStore } from "./helpers";
import Routes from "./Routes";
import { StaticContext } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;

// {4}
app.use(compression());
// {5}
app.use(express.static("public"));
// {6}
app.use("/api", proxy("http://react-ssr-api.herokuapp.com", {
  proxyReqOptDecorator: (opts) => {
    opts.headers["x-forwarded-host"] = `localhost:${PORT}`;
    return opts;
  },
}));

app.get("*", (req, res) => {
  // {8a}
  const store = setStore(req);

  // {1}
  const promises = matchRoutes(Routes, req.path).map((matchedRoute) => {
    const { route } = matchedRoute;
    return route.loadData ? route.loadData(store) : null;
  });
  Promise.all(promises).then(() => {
    // {14}
    const serverContext: StaticContext = {};

    // {15}
    const content = renderer(req, store, serverContext);

    // {17}
    if (serverContext.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
