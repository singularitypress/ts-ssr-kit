import { FETCH_USERS } from "../actions";
import { ActionGet } from "./../../types/index";

export const users = (
  state = [{ id: 0, name: "default user" }],
  action: ActionGet
) => {
  return action.type === FETCH_USERS ? action.payload.data : state;
};
