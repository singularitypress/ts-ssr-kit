import { RouteConfig } from "react-router-config";

interface CustomRoutesConfig extends RouteConfig {
  title: string;
}

export interface BaseProps {
  route: {
    routes: CustomRoutesConfig[]
  }
}
