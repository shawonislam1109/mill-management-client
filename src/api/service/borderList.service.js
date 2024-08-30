import api from "../../api/apiConfig";

export const borderListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBorderList: build.query({
      query: () => {
        return {
          url: "/borderList",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getBorderListFilter: build.query({
      query: ({ month }) => {
        return {
          url: `/borderList/filter?month=${month}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getBorderEachBorderMillHistory: build.query({
      query: (borderId) => {
        return {
          url: `/border-history/${borderId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getBorderEachBorderMillHistoryFilter: build.query({
      query: ({ borderId, month }) => {
        return {
          url: `/border-history/filter/${borderId}?month=${month}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getBorderEachBorderTransitionHistory: build.query({
      query: (borderId) => {
        return {
          url: `/borderList/transition-history/${borderId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    //
    getBorderEachBorderTransitionHistoryFilter: build.query({
      query: ({ borderId, month }) => {
        return {
          url: `/borderList/transition-history/filter/${borderId}?month=${month}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getByIdBorderList: build.query({
      query: (borderId) => {
        return {
          url: `/borderList/${borderId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getByIdBorderTransition: build.query({
      query: (borderId) => {
        return {
          url: `/borderList/transition/${borderId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    createBorderList: build.mutation({
      query: ({ data }) => {
        return {
          url: "/borderList",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(
        { handleCloseDialog, merchant, setError, reset },
        { dispatch, queryFulfilled }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getBorderList", merchant, (draft) => {
              draft.unshift(data?.saveBorderList);
            })
          );
          dispatch(
            api.util.updateQueryData(
              "getByIdBorderTransition",
              merchant,
              (draft) => {
                draft.unshift(data?.borderTransition);
              }
            )
          );
          handleCloseDialog();
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateBorderList: build.mutation({
      query: ({ data }) => {
        return {
          url: `/borderList/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(
        { handleCloseDialog, merchant, setError, reset },
        { dispatch, queryFulfilled }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData("getBorderList", merchant, (draft) => {
              const findIndex = draft.findIndex(
                (item) => item._id === data._id
              );
              draft[findIndex] = data;
            })
          );
          handleCloseDialog();
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    balanceAdd: build.mutation({
      query: ({ data }) => {
        return {
          url: `/borderList/balance-add/${data.border}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(
        { handleCloseDialog, merchant, setError, reset },
        { dispatch, queryFulfilled }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData("getBorderList", merchant, (draft) => {
              const findIndex = draft.findIndex(
                (item) => item._id === data?.updateBalance?._id
              );
              draft[findIndex] = data?.updateBalance;
            })
          );
          dispatch(
            api.util.updateQueryData(
              "getByIdBorderTransition",
              merchant,
              (draft) => {
                draft.unshift(data?.transition);
              }
            )
          );
          handleCloseDialog();
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteBorderList: build.mutation({
      query: ({ BorderListId }) => {
        return {
          url: `/borderList/delete/${BorderListId}`,
          method: "PATCH",
        };
      },
      async onQueryStarted(
        { handleCloseDialog, merchant },
        { dispatch, queryFulfilled }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;

          dispatch(
            api.util.updateQueryData("getBorderList", merchant, (draft) => {
              // Find the index of the item to be removed
              const index = draft.findIndex((item) => item._id === data?._id);
              if (index !== -1) {
                // Remove the item from the draft
                draft.splice(index, 1);
              }
            })
          );
          handleCloseDialog();
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetBorderListQuery,
  useLazyGetBorderListFilterQuery,
  useGetByIdBorderListQuery,
  useCreateBorderListMutation,
  useUpdateBorderListMutation,
  useDeleteBorderListMutation,
  useGetBorderEachBorderMillHistoryQuery,
  useLazyGetBorderEachBorderMillHistoryFilterQuery,
  useGetBorderEachBorderTransitionHistoryQuery,
  useLazyGetBorderEachBorderTransitionHistoryFilterQuery,
  useBalanceAddMutation,
} = borderListApi;
