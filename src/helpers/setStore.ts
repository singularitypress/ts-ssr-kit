import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import reducers from "../client/reducers";

// {8a}
export const setStore = (req: any) => {
  // {8}
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: {
      cookie: req.get("cookie") || "",
    },
  });
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
  );
  return store;
};
