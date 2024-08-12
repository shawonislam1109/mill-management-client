import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";

import { CssBaseline } from "@mui/material";
import store from "./store/index.js";
import { AuthProvider } from "./hooks/useContext.jsx";
import { Toaster } from "react-hot-toast";
import ThemeCustomization from "./themes/index.jsx";
import LoadingProgress from "./maintenance/LoadingProgress.jsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeCustomization>
      <ReduxProvider store={store}>
        <AuthProvider>
          <CssBaseline />
          <Suspense fallback={<LoadingProgress />}>
            <App />
          </Suspense>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </ReduxProvider>
    </ThemeCustomization>
  </React.StrictMode>
);
