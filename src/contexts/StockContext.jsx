import { createContext, useState } from "react";

const StockContext = createContext();

function StockProvider({ children }) {
  const [name, setName] = useState("");

  const getName = (data) => {
    setName(data);
  };

  return (
    <StockContext.Provider value={{ name, getName }}>
      {children}
    </StockContext.Provider>
  );
}

export default StockContext;
export { StockProvider };
