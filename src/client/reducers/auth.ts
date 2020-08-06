import { ActionGet } from "./../../types";
import { ActionTypes } from "./../../data/ActionTypes";

// {11}
export const auth = (
  state = null as any,
  action: ActionGet,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_CURRENT_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};
