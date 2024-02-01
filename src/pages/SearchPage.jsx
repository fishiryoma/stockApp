import StockPage from "./StockPage";
import { useState } from "react";
import { Container } from "../componenets/Container";
import { getNameBySymbol, getAbstractByStockId } from "../api/stock";

const stock = {
  id: 5,
  symbol: "2330",
  name: "台積電",
  createdAt: "2024-01-22T07:01:42.000Z",
  updatedAt: "2024-01-22T07:01:42.000Z",
};
function SearchPage() {
  const [keyword, setKeyword] = useState("");
  // const [stockInfo, setStockInfo] = useState("");
  // const handleClick = async () => {
  //   try {
  //     const resSymbol = await getNameBySymbol(keyword);
  //     const resCheckStockBuy = await getAbstractByStockId(resSymbol.id);
  //     if (resCheckStockBuy.success) {
  //       setStockInfo(resSymbol.data.stock);
  //     }
  //   } catch (err) {
  //     console.log(`Can't find Stock ${err}`);
  //   }
  // };

  return (
    <Container className="bg-gray-800">
      <div className="flex justify-center">
        <form className="">
          <input
            type="text"
            placeholder="輸入個股代碼"
            className="input w-60"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-ghost text-white bg-gray-500 hover:bg-gray-600 text-lg ml-2"
            // onClick={handleClick}
          >
            搜尋
          </button>
        </form>
      </div>
      <p className="text-lg mt-3 text-center">查無此股票</p>
      {/* <StockPage stock={stock} /> */}
    </Container>
  );
}

export default SearchPage;
