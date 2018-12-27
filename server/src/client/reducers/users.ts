import { ActionGet } from "./../../types";
import { ActionTypes } from "./../../data/ActionTypes";

export const users = (
  state = [{ id: 0, name: "default user" }],
  action: ActionGet
) => {
  return action.type === ActionTypes.FETCH_USERS ? action.payload.data : state;
};
