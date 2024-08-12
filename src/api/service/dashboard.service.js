import api from "../../api/apiConfig";

export const dashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => {
        return {
          url: `/dashboard`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
