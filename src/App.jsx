import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewTransctionPage from "./pages/NewTransactionPage";
import SumPage from "./pages/SumPage";
import StockPage from "./pages/StockPage";
import TransactionPage from "./pages/TransactionPage";
import Sidebar from "./componenets/Sidebar";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import StockContext from "./contexts/StockContext";

function App() {
  const { symbol } = useContext(StockContext);
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow mt-12">
        <Routes>
          <Route path="*" element={<SumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/newtransc" element={<NewTransctionPage />} />
          <Route path={`/stock/${symbol}`} element={<StockPage />} />
          <Route path="/transcsum" element={<TransactionPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
