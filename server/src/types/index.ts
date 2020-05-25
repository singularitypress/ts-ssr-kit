import { AxiosResponse } from "axios";

export * from "./Base";
export * from "./pages";

export interface ActionGet {
  type: string;
  payload: AxiosResponse;
}

export interface Users {
  id: number;
  name: string;
}

export interface State {
  users: Array<Users>;
  auth: any;
}

export interface StaticContext {
  notFound?: boolean;
}

declare global {
  interface Window { INIT: any; }
}
