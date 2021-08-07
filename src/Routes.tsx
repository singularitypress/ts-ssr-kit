import { RouteConfig } from "react-router-config";
import { Base } from "./client/template";
import * as pages from "./client/pages";

// {9}
export default [
  {
    ...Base,
    routes: Object.values(pages),
  },
] as RouteConfig[];
