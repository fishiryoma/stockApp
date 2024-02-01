import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewTransctionPage from "./pages/NewTransactionPage";
import SumPage from "./pages/SumPage";
import StockPage from "./pages/StockPage";
import NewDividendPage from "./pages/NewDividendPage";
import Nav from "./componenets/Nav";
import SearchPage from "./pages/SearchPage";
import Footer from "./componenets/Footer";
import { Routes, Route } from "react-router-dom";
import { useStock } from "./hooks/useStock";

function App() {
  const { stockBtn } = useStock();
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<SumPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/newtransc" element={<NewTransctionPage />} />
          <Route path={`/stock/${stockBtn.symbol}`} element={<StockPage />} />
          <Route path="/newdividend" element={<NewDividendPage />} />
          <Route path="/stock" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
