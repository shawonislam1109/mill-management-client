import api from "../../api/apiConfig";
import { modifyUser, userLogin } from "../../store/reducer/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ data }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted({ reset }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data._id);
          localStorage.setItem("isLoggedIn", true);
          dispatch(
            userLogin({
              user: data.data,
              token: data.token,
            })
          );
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),

    signUp: build.mutation({
      query: ({ data }) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),

    allBorder: build.query({
      query: () => {
        return {
          url: `/auth/allUser`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getByIdBorder: build.query({
      query: (userId) => {
        return {
          url: `/auth/${userId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),

    activeMillCount: build.mutation({
      query: ({ data, userId }) => {
        return {
          url: userId
            ? `/auth/active/mill-count?userId=${userId}`
            : `/auth/active/mill-count`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(
        { reset, setError, userId, user },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: data } = await queryFulfilled;

          console.log(data);
          dispatch(
            modifyUser({
              data: {
                ...user,
                schedule: data?.data?.user?.schedule,
                fullMill: data?.data?.user?.fullMill,
                millOff: data?.data?.user?.millOff,
              },
            })
          );
          dispatch(
            api.util.updateQueryData("getByIdBorder", userId, (draft) => {
              draft = data?.data?.border;
              return draft;
            })
          );
          dispatch(
            api.util.updateQueryData("getBorderList", user?._id, (draft) => {
              const findIndex = draft.findIndex(
                (item) => item.border === userId
              );
              if (findIndex !== -1) {
                draft[findIndex] = data?.data?.border;
              }
              return draft;
            })
          );
          reset();
        } catch (error) {
          setError(error?.data?.data.path, error?.data?.data.msg);
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useAllBorderQuery,
  useActiveMillCountMutation,
  useGetByIdBorderQuery,
} = authApi;
