import api from "../../api/apiConfig";

export const productPurchaseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET PRODUCT
    getProductPurchase: build.query({
      query: ({ pageIndex = 1, pageSize = 10 }) => {
        return {
          url: `/products/purchase?page=${pageIndex}&limit=${pageSize}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getProductSinglePurchase: build.query({
      query: (purchaseId) => {
        return {
          url: `/products/purchase/purchase/${purchaseId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getProductSinglePurchaseInvoice: build.query({
      query: (purchaseId) => {
        return {
          url: `/products/purchase/invoice/${purchaseId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    // CREATE PRODUCT
    purchaseProduct: build.mutation({
      query: ({ data }) => {
        return {
          url: "/products/purchase",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(
        { merchant, reset, navigate },
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
          navigate(`/purchase/${data?._id}/invoice`);
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
  }),
});

export const {
  // get product and get product store
  useGetProductSinglePurchaseInvoiceQuery,
  useGetProductSinglePurchaseQuery,
  useGetProductPurchaseQuery,
  useGetProductQuery,
  useGetProductTrashQuery,
  useGetProductByIdQuery,

  // product update and create
  useUpdateProductMutation,
  usePurchaseProductMutation,

  // product delete and restore
  useDeleteAndRestoreProductMutation,
  useRestoreProductMutation,
} = productPurchaseApi;
