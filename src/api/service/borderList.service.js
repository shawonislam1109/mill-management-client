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
              draft.unshift(data);
            })
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

          console.log(data);

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
  useGetByIdBorderListQuery,
  useCreateBorderListMutation,
  useUpdateBorderListMutation,
  useDeleteBorderListMutation,
} = borderListApi;
