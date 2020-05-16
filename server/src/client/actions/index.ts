import axios from "axios";
import { ActionGet } from "../../types";
import { Dispatch } from "redux";
import { ActionTypes } from "../../data";

export const fetchUsers = () => async (dispatch: Dispatch<ActionGet>) => {
  const res = await axios.get("http://react-ssr-api.herokuapp.com/users");

  const action: ActionGet = { type: ActionTypes.FETCH_USERS, payload: res };

  dispatch(action);
};
