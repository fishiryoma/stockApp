import { createContext, useState } from "react";

const StockContext = createContext();

function StockProvider({ children }) {
  const [symbol, setSymbol] = useState("");

  const getSymbol = (symbol) => {
    setSymbol(symbol);
  };

  return (
    <StockContext.Provider value={{ symbol, getSymbol }}>
      {children}
    </StockContext.Provider>
  );
}

export default StockContext;
export { StockProvider };
