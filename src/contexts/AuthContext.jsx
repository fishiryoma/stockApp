import { createContext, useContext, useState, useEffect } from "react";
import { checkPermission } from "../contexts";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkValid = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;
      if (authToken) {
        const { success } = await checkPermission(authToken);
        if (success) setIsAuthenticated(true);
      }
    };
    checkValid();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}></AuthContext.Provider>
  );
}

export default AuthProvider;
