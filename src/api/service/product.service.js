import api from "../../api/apiConfig";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET PRODUCT
    getProduct: build.query({
      query: ({ pageIndex = 1, pageSize = 10 }) => {
        return {
          url: `/product?page=${pageIndex + 1}&limit=${pageSize}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // GET PRODUCT BY ID
    getProductById: build.query({
      query: (productId) => {
        return {
          url: `/product/${productId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // GET PRODUCT STORE
    getProductStore: build.query({
      query: () => {
        return {
          url: "/product/store",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // GET PRODUCT TRASH
    getProductTrash: build.query({
      query: () => {
        return {
          url: "/product/trash",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // CREATE PRODUCT
    createProduct: build.mutation({
      query: ({ data }) => {
        return {
          url: "/product",
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
            api.util.updateQueryData("getProduct", merchant, (draft) => {
              draft.data.unshift(data);
              draft.totalDocument += 1;
              draft.totalPages += 1;
            })
          );

          dispatch(
            api.util.updateQueryData(
              "getStock",
              { pageIndex: 0, pageSize: 10 },
              (draft) => {
                draft.data.unshift(data?.stock);
                draft.totalDocument += 1;
                draft.totalPages += 1;
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

    // UPDATE PRODUCT
    updateProduct: build.mutation({
      query: ({ data }) => {
        return {
          url: `/product/${data._id}`,
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
            api.util.updateQueryData("getProduct", merchant, (draft) => {
              const findIndex = draft.data.findIndex(
                (item) => item._id === data._id
              );
              draft.data[findIndex] = data;
            })
          );
          handleCloseDialog();
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // DELETE PRODUCT
    deleteAndRestoreProduct: build.mutation({
      query: ({ ProductId }) => {
        return {
          url: `/product/delete/${ProductId}`,
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
            api.util.updateQueryData("getProduct", merchant, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          dispatch(
            api.util.updateQueryData("getProductTrash", merchant, (draft) => {
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

    // RESTORE PRODUCT
    restoreProduct: build.mutation({
      query: ({ ProductId }) => {
        return {
          url: `/product/restore/${ProductId}`,
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
            api.util.updateQueryData("getProduct", merchant, (draft) => {
              draft.unshift(data);
            })
          );
          dispatch(
            api.util.updateQueryData("getProductTrash", merchant, (draft) => {
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
  // get product and get product store
  useGetProductStoreQuery,
  useGetProductQuery,
  useGetProductTrashQuery,
  useGetProductByIdQuery,

  // product update and create
  useUpdateProductMutation,
  useCreateProductMutation,

  // product delete and restore
  useDeleteAndRestoreProductMutation,
  useRestoreProductMutation,
} = productApi;
