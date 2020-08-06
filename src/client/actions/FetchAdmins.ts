import { AxiosInstance } from "axios";
import { ActionGet } from "../../types";
import { Dispatch } from "redux";
import { ActionTypes } from "../../data";

// {10}
export const fetchAdmins = () => async (
  dispatch: Dispatch<ActionGet>,
  getState: any,
  api: AxiosInstance,
) => {
  const res = await api.get("/admins");
  dispatch({
    type: ActionTypes.FETCH_ADMINS,
    payload: res,
  });
};
