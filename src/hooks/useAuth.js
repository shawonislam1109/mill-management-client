import { useContext } from "react";
import { AuthContext } from "./useContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  return { ...context };
};

export default useAuth;
