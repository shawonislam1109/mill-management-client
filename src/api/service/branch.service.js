import api from "../../api/apiConfig";

export const branchesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBranch: build.query({
      query: () => {
        return {
          url: "/branches",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetBranchQuery } = branchesApi;
