import AllTransaction from "../componenets/AllTransaction";
import AllDividend from "../componenets/AllDividend";
import StockSumTable from "../componenets/StockSumTable";
import StockChart from "../componenets/StockChart";
import { Container } from "../componenets/Container";
import { useContext } from "react";
import StockContext from "../contexts/StockContext";

function StockPage() {
  const { name } = useContext(StockContext);

  return (
    <Container>
      <p className="text-3xl mb-6">{`${name.symbol} ${name.name}`}</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-8 justify-items-center items-center">
        <AllTransaction />
        <StockSumTable />
        <AllDividend />
        <StockChart />
      </div>
    </Container>
  );
}

export default StockPage;
