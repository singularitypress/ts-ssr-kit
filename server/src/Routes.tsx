import { RouteConfig } from "react-router-config";
import Home from "./client/pages/Home";
import UsersList from "./client/pages/UsersList";

export default [
  {
    ...Home,
    path: "/",
    exact: true,
  },
  {
    ...UsersList,
    path: "/users",
  },
] as RouteConfig[];
