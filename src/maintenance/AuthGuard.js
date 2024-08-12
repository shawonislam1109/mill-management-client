import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    } else {
      navigate(location.pathname);
    }
  }, [isLoggedIn]);

  return children;
};

export default AuthGuard;
