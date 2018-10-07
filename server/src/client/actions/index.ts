import axios from "axios";
import { ActionGet } from "../../types";
import { Dispatch } from "redux";

export const FETCH_USERS = "fetch_users";
export const fetchUsers = () => async (dispatch: Dispatch<ActionGet>) => {
  const res = await axios.get("http://react-ssr-api.herokuapp.com/users");

  let action: ActionGet = { type: FETCH_USERS, payload: res };

  dispatch(action);
};
