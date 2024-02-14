import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const MyPage = () => {
  const [page, setPage] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/sum");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="myPage flex-grow ">
      {page ? (
        <LoginPage setPage={setPage} />
      ) : (
        <RegisterPage setPage={setPage} />
      )}
    </div>
  );
};

export default MyPage;
