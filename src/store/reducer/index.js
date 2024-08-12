import { combineReducers } from "redux";
import auth from "./auth";
import api from "../../api/apiConfig";

export const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
});
