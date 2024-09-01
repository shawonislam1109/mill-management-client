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
    getDashboardMonthlyFilter: build.query({
      query: ({ month }) => {
        return {
          url: `/dashboard/filter?month=${month}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetDashboardQuery, useLazyGetDashboardMonthlyFilterQuery } =
  dashboardApi;
