import { RouteConfig } from "react-router-config";
import { Base } from "./client/template";
import Home from "./client/pages/Home";
import UsersList from "./client/pages/UsersList";

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
