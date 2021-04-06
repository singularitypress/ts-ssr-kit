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
app.use(express.static("assets"));
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
  const promises =
    matchRoutes(Routes, req.path)
      .map((matchedRoute) => {
        const { route } = matchedRoute;
        return route.loadData ? route.loadData(store) : null;
      })
      .map((promise) => { // {1a}
        if (promise) {
          return new Promise((resolve, reject) => {
            promise.then(resolve).catch(resolve);
          });
        } else return false;
      });
  Promise.all(promises).then(() => {
    // {14}
    const serverContext: StaticContext = {};

    // {15}
    const content = renderer(req, store, serverContext);

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
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
