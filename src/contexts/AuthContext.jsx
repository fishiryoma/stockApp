import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { checkPermission } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkValid = async () => {
      const authToken = Cookies.get("token_StockApp");
      if (!authToken) {
        setIsAuthenticated(false);
        return;
      }
      // 還沒確定DATA是否被包在data裡面
      const data = await checkPermission(authToken);
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkValid();
  }, [pathname]);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}></AuthContext.Provider>
  );
}

export default AuthProvider;
