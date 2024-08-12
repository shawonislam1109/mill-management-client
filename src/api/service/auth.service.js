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
      async onQueryStarted({ reset, setError }, { dispatch, queryFulfilled }) {
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
          setError(error?.data?.data.path, error?.data?.data.msg);
          console.log(error);
        }
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

    activeMillCount: build.mutation({
      query: ({ data }) => {
        return {
          url: `/auth/active/mill-count`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted({ reset, setError }, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;

          dispatch(modifyUser({ data: data?.data }));
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
} = authApi;
