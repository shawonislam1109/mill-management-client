import { lazy } from "react";

import Dashboard from "../pages/dashboard/Dashboard.jsx";
import BorderList from "../pages/BorderList/BorderList.jsx";
import MyAccount from "../pages/my-account/MyAccount.jsx";
import MillCount from "../pages/mill-count/MillCount.jsx";

const mainRoutes = [
  // @PRODUCT ROUTES

  // DASHBOARD ROUTES
  {
    path: "",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/border-list",
    element: <BorderList />,
  },
  {
    path: "/profile",
    children: [
      {
        path: ":profileId",
        element: <MyAccount />,
      },
    ],
  },
  {
    path: "/mill-count",
    children: [
      {
        path: "",
        element: <MillCount />,
      },
    ],
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
];

export default mainRoutes;
