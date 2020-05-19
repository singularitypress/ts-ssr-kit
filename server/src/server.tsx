import * as express from "express";
import * as proxy from "express-http-proxy";
import * as compression from "compression";
import { matchRoutes } from "react-router-config";
import { renderer, setStore } from "./helpers";
import Routes from "./Routes";

const app = express();
const PORT = process.env.PORT || 4000;

// {4}
app.use(compression());
// {5}
app.use(express.static("public"));
// {6}
app.use("/api", proxy("http://react-ssr-api.herokuapp.com", {
  proxyReqOptDecorator: (opts) => {
    opts.headers["x-forwarded-host"] = "localhost:3000";
    return opts;
  },
}));

app.get("*", (req: any, res: any) => {
  const store = setStore();

  // {1}
  const promises = matchRoutes(Routes, req.path).map((matchedRoute) => {
    const { route } = matchedRoute;
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
