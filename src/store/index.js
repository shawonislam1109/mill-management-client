import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
import api from "../api/apiConfig";
import { successAndErrorHandler } from "../utils/response-handler";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(successAndErrorHandler),
});

// Extract dispatch from store
export const { dispatch } = store;

// Export useDispatch and useSelector
export const useDispatch = () => useAppDispatch();
export const useSelector = useAppSelector;

// Export the store
export default store;
