import { createContext, useEffect, useState } from "react";

export const StockContext = createContext();

function StockProvider({ children }) {
  const [stockBtn, setStockBtn] = useState("");
  const getStockBtn = (data) => {
    setStockBtn(data);
  };

  return (
    <StockContext.Provider value={{ stockBtn, getStockBtn }}>
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;
