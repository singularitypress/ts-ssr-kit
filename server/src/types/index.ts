import { AxiosResponse } from "axios";

export interface ActionGet {
  type: string;
  payload: AxiosResponse;
}
