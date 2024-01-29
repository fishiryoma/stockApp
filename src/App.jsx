import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewTransctionPage from "./pages/NewTransactionPage";
import SumPage from "./pages/SumPage";
import StockPage from "./pages/StockPage";
import NewDividendPage from "./pages/NewDividendPage";
import Nav from "./componenets/Nav";
import Footer from "./componenets/Footer";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import StockContext from "./contexts/StockContext";

function App() {
  const { name } = useContext(StockContext);
  return (
    <div className="p-3 flex flex-col gap-1 h-screen">
      <Nav />
      <div className="flex-grow h-full">
        <Routes>
          <Route path="*" element={<SumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/newtransc" element={<NewTransctionPage />} />
          <Route path={`/stock/${name.symbol}`} element={<StockPage />} />
          <Route path="/newdividend" element={<NewDividendPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
