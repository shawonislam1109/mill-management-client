import api from "../../api/apiConfig";

export const supplierApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSupplier: build.query({
      query: () => {
        return {
          url: "/supplier",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    getSupplierTrash: build.query({
      query: () => {
        return {
          url: "/supplier/trash",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    createSupplier: build.mutation({
      query: ({ data }) => {
        return {
          url: "/supplier",
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
            api.util.updateQueryData("getSupplier", merchant, (draft) => {
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

    updateSupplier: build.mutation({
      query: ({ data }) => {
        return {
          url: `/supplier/${data._id}`,
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
            api.util.updateQueryData("getSupplier", merchant, (draft) => {
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

    deleteAndRestoreSupplier: build.mutation({
      query: ({ supplierId }) => {
        return {
          url: `/supplier/delete/${supplierId}`,
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
            api.util.updateQueryData("getSupplier", merchant, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          dispatch(
            api.util.updateQueryData("getSupplierTrash", merchant, (draft) => {
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

    restoreSupplier: build.mutation({
      query: ({ supplierId }) => {
        return {
          url: `/supplier/restore/${supplierId}`,
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
            api.util.updateQueryData("getSupplier", merchant, (draft) => {
              draft.unshift(data);
            })
          );
          dispatch(
            api.util.updateQueryData("getSupplierTrash", merchant, (draft) => {
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
  useGetSupplierQuery,
  useGetSupplierTrashQuery,
  useUpdateSupplierMutation,
  useCreateSupplierMutation,
  useDeleteAndRestoreSupplierMutation,
  useRestoreSupplierMutation,
} = supplierApi;
