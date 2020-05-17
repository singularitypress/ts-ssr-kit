import { RouteConfig } from "react-router-config";
import Home from "./client/components/Home";
import UsersList, { loadData } from "./client/components/UsersList";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/users",
    component: UsersList,
    loadData,
  },
] as RouteConfig[];
