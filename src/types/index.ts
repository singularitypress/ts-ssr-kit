export * from "./components";
export * from "./utils";

export interface Users {
  id: number;
  name: string;
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
