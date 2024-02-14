import StockPage from "./StockPage";
import { useState, useEffect } from "react";
import { Container } from "../componenets/Container";
import { getAbstractByStockId, getNameBySymbol } from "../api/stock";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [stockInfo, setStockInfo] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await getAbstractByStockId(keyword);
      if (res.success) {
        const res = await getNameBySymbol(keyword);
        setStockInfo([res.data.stock]);
        setKeyword("");
      }
    } catch (err) {
      console.log(`Can't find Stock ${err}`);
      Swal.fire({
        title: "找不到這隻股票",
        icon: "error",
        timer: 1700,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Container className="bg-gray-800">
      <div className="flex justify-center">
        <form>
          <input
            type="number"
            placeholder="輸入個股代碼"
            className="input w-60"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-ghost text-white bg-gray-500 hover:bg-gray-600 text-lg ml-2"
            onClick={handleClick}
          >
            搜尋
          </button>
        </form>
      </div>

      {stockInfo.length ? <StockPage stock={stockInfo} /> : ""}
    </Container>
  );
}

export default SearchPage;
