import { lazy } from "react";

import Dashboard from "../pages/dashboard/Dashboard.jsx";
import BorderList from "../pages/BorderList/BorderList.jsx";
import MyAccount from "../pages/my-account/MyAccount.jsx";
import MillCount from "../pages/mill-count/MillCount.jsx";
import MillHistory from "../pages/each-border-mill-history/MillHistory.jsx";
import TransitionHistory from "../pages/each-border-mill-history/TransitionHistory.jsx";
import Bua from "../pages/bua/Bua.jsx";

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
    path: "/mill-history/:borderId",
    children: [
      {
        path: "",
        element: <MillHistory />,
      },
    ],
  },
  {
    path: "/transition-history/:borderId",
    children: [
      {
        path: "",
        element: <TransitionHistory />,
      },
    ],
  },
  {
    path: "/bua",
    children: [
      {
        path: "",
        element: <Bua />,
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
