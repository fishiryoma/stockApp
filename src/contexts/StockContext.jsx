import { createContext, useState, useEffect } from "react";
import {
  getTranscByStockId,
  getDividendByStockId,
  getAbstractByStockId,
} from "../api/stock";

export const StockContext = createContext();

function StockProvider({ children }) {
  // 目前股票ID
  const [stockBtn, setStockBtn] = useState("");

  const getStockBtn = (data) => {
    setStockBtn(data);
  };

  return (
    <StockContext.Provider
      value={{
        stockBtn,
        getStockBtn,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;
