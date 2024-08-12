// set up auth context and auth provider
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axiosService from "../utils/axios";
import axios from "axios";
import { userLogin } from "../store/reducer/auth";

const AuthContext = React.createContext();

// VERIFY TOKEN
const verifyToken = (token) => {
  if (!token) {
    return false;
  }
  const decode = jwtDecode(token);
  return decode.exp > Date.now() / 1000;
};

// -> SET SESSION
const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem("token", serviceToken);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    delete axiosService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  // -> USE DISPATCH HOOKS
  const dispatch = useDispatch();

  // -> LOCAL STORE GET USER-ID
  const userId = localStorage.getItem("user");

  const { mode, isLoggedIn, user, token, branch } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const init = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token && verifyToken(token)) {
          setSession(token);
          const res = await axiosService.get(`/auth/${userId}`);
          const { data } = res;
          dispatch(
            userLogin({
              user: data.data,
              token: token,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ mode, isLoggedIn, user, token, activeBranch: branch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
