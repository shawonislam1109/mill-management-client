import { createBrowserRouter } from "react-router-dom";
// import RootPage from "../pages/rootPage/RootPage";
import { lazy } from "react";
import Error404 from "../maintenance/Error.jsx";
import mainRoutes from "./MainRoutes.jsx";
import ActiveLogin from "../maintenance/ActiveLogin.js";

const RootPage = lazy(() => import("../pages/rootPage/RootPage"));
const Login = lazy(() => import("../pages/AuthPage/Login.jsx"));
const SignUp = lazy(() => import("../pages/AuthPage/SignUp.jsx"));
const AuthGuard = lazy(() => import("./../maintenance/AuthGuard"));

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <RootPage />
      </AuthGuard>
    ),
    children: [...mainRoutes],
  },

  {
    path: "auth/login",
    element: (
      <ActiveLogin>
        <Login />
      </ActiveLogin>
    ),
  },
  {
    path: "auth/signUp",
    element: (
      <ActiveLogin>
        <SignUp />
      </ActiveLogin>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default route;
