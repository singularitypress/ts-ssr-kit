import { RouteConfig } from "react-router-config";
import { Base } from "./client/template";
import { Home, UsersList, NotFoundPage, AdminsList, Theme } from "./client/pages";

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
      {
        ...AdminsList,
        path: "/admins",
      },
      {
        ...Theme,
        path: "/theme",
      },
      {
        ...NotFoundPage, // {13}
      },
    ],
  },
] as RouteConfig[];
