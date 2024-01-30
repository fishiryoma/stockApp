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
    <Container className="bg-gray-800 text-white">
      <p className="text-3xl mb-6">{`${name.symbol} ${name.name}`}</p>
      <div className="grid grid-rows-4 lg:grid-rows-2 lg:grid-cols-2 gap-8 lg:gap-20 lg:items-center">
        <div className="lg:col-start-2 lg:row-start-1 w-full ">
          <StockSumTable />
        </div>
        <StockChart />
        <div className="lg:col-start-1 lg:row-start-1 mx-auto lg:w-full flex justify-center">
          <AllTransaction />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 flex justify-center">
          <AllDividend />
        </div>
      </div>
    </Container>
  );
}

export default StockPage;
