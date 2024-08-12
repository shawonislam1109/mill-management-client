import api from "../../api/apiConfig";

export const stockApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStock: build.query({
      query: ({ pageIndex = 1, pageSize = 1 }) => {
        return {
          url: `/stocks?page=${pageIndex + 1}&limit=${pageSize}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetStockQuery } = stockApi;
