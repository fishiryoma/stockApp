import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkPermission } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkValid = async () => {
      const authToken = Cookies.get("token_StockApp");
      if (!authToken) {
        setIsAuthenticated(false);

        return;
      }
      const res = await checkPermission();
      if (res) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkValid();
  }, [isAuthenticated, navigate]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
