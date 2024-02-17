import NewTransctionPage from "./pages/NewTransactionPage";
import SumPage from "./pages/SumPage";
import StockPage from "./pages/StockPage";
import NewDividendPage from "./pages/NewDividendPage";
import Nav from "./componenets/Nav";
import SearchPage from "./pages/SearchPage";
import Footer from "./componenets/Footer";
import { Routes, Route } from "react-router-dom";
import { useStock } from "./hooks/useStock";
import MyPage from "./pages/MyPage";
import CallbackPage from "./pages/CallbackPage";
import UserPage from "./pages/UserPage";

function App() {
  const { stockShowing } = useStock();
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/*" element={<MyPage />} />
          <Route path="/sum" element={<SumPage />} />
          <Route path="/newtransc" element={<NewTransctionPage />} />
          {stockShowing.length ? (
            <Route
              path={`/stock/${stockShowing[0].symbol}`}
              element={<StockPage />}
            />
          ) : (
            ""
          )}
          <Route path="/newdividend" element={<NewDividendPage />} />
          <Route path="/stock" element={<SearchPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
