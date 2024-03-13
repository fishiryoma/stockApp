import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import SumPage from "./pages/SumPage";
import NewTransctionPage from "./pages/NewTransactionPage";
import NewDividendPage from "./pages/NewDividendPage";
import StockPage from "./pages/StockPage";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import ErrorPage from "./pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<SumPage />} />
            <Route path="/mypage/newdividend" element={<NewDividendPage />} />
            <Route path="/mypage/newtransc" element={<NewTransctionPage />} />
            <Route path="/mypage/stock" element={<SearchPage />} />
            <Route path="/mypage/stock/:id" element={<StockPage />} />
            <Route path="/mypage/user" element={<UserPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}
