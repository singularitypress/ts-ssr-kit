import { AxiosResponse } from "axios";
import { IAdmin } from "./pages";

export * from "./Base";
export * from "./pages";
export * from "./components";
export * from "./utils";

export interface ActionGet {
  type: string;
  payload: AxiosResponse;
}

export interface Users {
  id: number;
  name: string;
}

export interface State {
  admins: IAdmin[];
  users: Array<Users>;
  auth: any;
  graphCSV: string;
}

export interface StaticContext {
  notFound?: boolean;
  action?: string;
  location?: { pathname: string; search: string; hash: string; state: any };
  url?: string;
}

declare global {
  interface Window {
    INIT: any;
  }
}
