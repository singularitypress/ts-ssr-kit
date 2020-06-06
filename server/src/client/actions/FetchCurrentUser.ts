import { AxiosInstance } from "axios";
import { ActionGet } from "../../types";
import { Dispatch } from "redux";
import { ActionTypes } from "../../data";

// {10}
export const fetchCurrentUser = () => async (
  dispatch: Dispatch<ActionGet>,
  getState: any,
  api: AxiosInstance,
) => {
  const res = await api.get("/current_user");
  dispatch({
    type: ActionTypes.FETCH_CURRENT_USER,
    payload: res,
  });
};
