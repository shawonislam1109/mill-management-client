import api from "../../api/apiConfig";

export const borderListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBua: build.query({
      query: () => {
        return {
          url: "/bua",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    createBua: build.mutation({
      query: ({ data }) => {
        return {
          url: "/bua",
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
            api.util.updateQueryData("getBua", merchant, (draft) => {
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

    updateBua: build.mutation({
      query: ({ data, buaId }) => {
        return {
          url: `/bua/${buaId}`,
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
            api.util.updateQueryData("getBua", merchant, (draft) => {
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
  }),
});

export const { useGetBuaQuery, useCreateBuaMutation, useUpdateBuaMutation } =
  borderListApi;
