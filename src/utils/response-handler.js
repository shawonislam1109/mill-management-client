import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const successAndErrorHandler = () => (next) => (action) => {
  const requestMethod = action.meta?.baseQueryMeta?.request?.method;
  if (isRejectedWithValue(action) && requestMethod !== "GET") {
    let errorMessage = action.payload?.data;
    if (typeof action.payload?.data?.message === "string") {
      errorMessage = action.payload?.data?.message;
    } else if (typeof errorMessage === "object") {
      errorMessage = errorMessage.message;
    }

    // enqueueSnackbar(errorMessage, {
    //   variant: "error",
    //   autoHideDuration: 2000,
    //   anchorOrigin: {
    //     vertical: "top",
    //     horizontal: "center",
    //   },
    // });
    toast.error(errorMessage);
  }

  if (isFulfilled(action) && requestMethod !== "GET") {
    const isString = typeof action.payload?.message === "string";
    if (isString) {
      // enqueueSnackbar(action.payload.message, {
      //   variant: "success",
      //   anchorOrigin: {
      //     vertical: "top",
      //     horizontal: "center",
      //   },
      // });
      toast.success(action.payload.message);
    }
  }
  return next(action);
};
