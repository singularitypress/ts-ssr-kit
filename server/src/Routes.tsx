import { RouteConfig } from "react-router-config";
import { Base } from "./client/template";
import { Home, UsersList } from "./client/pages";

// {9}
export default [
  {
    ...Base,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true,
      },
      {
        ...UsersList,
        path: "/users",
      },
    ],
  },
] as RouteConfig[];
