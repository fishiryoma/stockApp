import StockPage from "./StockPage";
import { useState } from "react";
import { Container } from "../componenets/Container";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  return (
    <Container className="bg-gray-800 text-white">
      <form>
        <input
          type="text"
          placeholder="輸入個股代碼"
          className="input input-bordered w-full max-w-xs"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-ghost text-lg">搜尋</button>
      </form>
      <p className="text-lg mt-3">查無此股票</p>
      <StockPage />
    </Container>
  );
}

export default SearchPage;
