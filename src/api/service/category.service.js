import api from "../../api/apiConfig";

export const supplierApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getCategoryTrash: build.query({
      query: () => {
        return {
          url: "/category/trash",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    createCategory: build.mutation({
      query: ({ data }) => {
        return {
          url: "/category",
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
            api.util.updateQueryData("getCategory", merchant, (draft) => {
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

    updateCategory: build.mutation({
      query: ({ data }) => {
        return {
          url: `/category/${data._id}`,
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
            api.util.updateQueryData("getCategory", merchant, (draft) => {
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

    deleteAndRestoreCategory: build.mutation({
      query: ({ categoryId }) => {
        return {
          url: `/category/delete/${categoryId}`,
          method: "PATCH",
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
            api.util.updateQueryData("getCategory", merchant, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          dispatch(
            api.util.updateQueryData("getCategoryTrash", merchant, (draft) => {
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

    restoreCategory: build.mutation({
      query: ({ categoryId }) => {
        return {
          url: `/category/restore/${categoryId}`,
          method: "PATCH",
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
            api.util.updateQueryData("getCategory", merchant, (draft) => {
              draft.unshift(data);
            })
          );
          dispatch(
            api.util.updateQueryData("getCategoryTrash", merchant, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          handleCloseDialog();
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryTrashQuery,
  useRestoreCategoryMutation,
  useDeleteAndRestoreCategoryMutation,
} = supplierApi;
