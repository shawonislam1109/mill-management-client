// redux toolkit import
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://198.23.217.45:9190/api/v1/",
    mode: "cors",
    prepareHeaders(headers, { getState }) {
      const { token, branch } = getState().auth;
      if (!token) return headers;
      headers.set("Authorization", "Bearer " + token);
      headers.set("branch", branch?._id);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
