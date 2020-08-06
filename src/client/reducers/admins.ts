import { ActionTypes } from "../../data";
import { ActionGet } from "../../types";

export const admins = (state = [] as any[], action: ActionGet) => {
  switch (action.type) {
    case ActionTypes.FETCH_ADMINS:
      return action.payload.data;
    default:
      return state;
  }
};
