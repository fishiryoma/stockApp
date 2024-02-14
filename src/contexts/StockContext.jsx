import { createContext, useState } from "react";

export const StockContext = createContext();

function StockProvider({ children }) {
  // 目前股票ID
  const [stockShowing, setStockShowing] = useState([]);

  return (
    <StockContext.Provider
      value={{
        stockShowing,
        setStockShowing,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;
