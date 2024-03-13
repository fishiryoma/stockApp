import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Outlet } from "react-router-dom";
import Footer from "../componenets/Footer";
import Nav from "../componenets/Nav";
import StockProvider from "../contexts/StockContext";

export default function MyPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col h-screen scrollbar">
      <Nav />
      <div className="flex-grow flex flex-col">
        <StockProvider>
          <Outlet />
        </StockProvider>
      </div>
      <Footer />
    </div>
  );
}
