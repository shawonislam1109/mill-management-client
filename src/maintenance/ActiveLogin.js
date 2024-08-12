import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ActiveLogin = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", {
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

export default ActiveLogin;
