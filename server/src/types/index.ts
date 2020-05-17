import { AxiosResponse } from "axios";

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
}

declare global {
  interface Window { INIT: any; }
}
