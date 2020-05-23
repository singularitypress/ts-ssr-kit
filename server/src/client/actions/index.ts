import { AxiosInstance } from "axios";
import { ActionGet } from "../../types";
import { Dispatch } from "redux";
import { ActionTypes } from "../../data";

// {7b}
export const fetchUsers = () => async (
  dispatch: Dispatch<ActionGet>,
  getState: any,
  api: AxiosInstance,
) => {
  const res = await api.get("/users");

  console.log(res);

  const action: ActionGet = { type: ActionTypes.FETCH_USERS, payload: res };

  dispatch(action);
};
