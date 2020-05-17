import * as express from "express";
import * as compression from "compression";
import { matchRoutes } from "react-router-config";
import { renderer, setStore } from "./helpers";
import Routes from "./Routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(compression());
app.use(express.static("public"));

app.get("*", (req: any, res: any) => {
  const store = setStore();

  /**
   * matchRoutes will return an array of routes whose path that match req.path. Then we map over the routes
   * that match whatever the user has requested and execute the .loadData function on that route if
   * it exists. The .loadData function is defined and exported from select components if they need to
   * load/request data. We're doing this so that Components that need to load/request data, can do so
   * server side. The flow is:
   * > loadData is defined in some Components
   * > loadData is imported and used in Routes.tsx
   * > loadData is used here based on routes found in Routes.tsx
   * > we pass in store into loadData which will be used in the component to execute the dispatch to load/request data
   * > we have a return, and since loadData is for loading/requesting data, the value is a promise.
   * > thus we... have an array of promises
   * > Promises.all is a native js thing where you pass in an array of promises and it'll be "resolved" once all promises
   *   in the array are resolved.
   * > we put res.send in the .then of Promise.all so that we only send data back to the user once the .loadData functions
   *   for the routes are resolved.
   *
   * We basically need to run the Redux Action to do a data request for components that need it before any JSX enters the picture.
   */
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
