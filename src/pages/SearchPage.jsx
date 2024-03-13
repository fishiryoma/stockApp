import StockPage from "./StockPage";
import { useState } from "react";
import { Container } from "../componenets/Container";
import { getAbstractByStockId, getNameBySymbol } from "../api/stock";
import { popupMsg } from "../componenets/Helper";
import { useStock } from "../hooks/useStock";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [stockInfo, setStockInfo] = useState(null);
  const { setStockShowing } = useStock();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getAbstractByStockId(keyword);
      if (res.success) {
        const res = await getNameBySymbol(keyword);
        setStockInfo(res.data.stock);
        setStockShowing(res.data.stock);
        setKeyword("");
      }
    } catch (err) {
      popupMsg("找不到這隻股票");
      console.error(err);
    }
  };

  return (
    <Container className="bg-gray-800">
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="輸入個股代碼"
            className="input w-60"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-ghost text-white bg-gray-500 hover:bg-gray-600 text-lg ml-2">
            搜尋
          </button>
        </form>
        {stockInfo && <StockPage stock={stockInfo} />}
      </div>
    </Container>
  );
}
