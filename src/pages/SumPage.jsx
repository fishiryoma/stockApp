import Table from "../componenets/Table";
import { TableContainer } from "../componenets/TableContainer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import StockContext from "../contexts/StockContext";

function SumPage() {
  const { getSymbol } = useContext(StockContext);

  const handleClick = (symbol) => {
    getSymbol(symbol);
  };
  const datas = [
    { symbol: "00878", quantity: 3000, cost: 10000, gain: -5000, id: "1" },
    { symbol: "2330", quantity: 3000, cost: 10000, gain: -5000, id: "2" },
    { symbol: "1234", quantity: 3000, cost: 10000, gain: -5000, id: "3" },
    { symbol: "3310", quantity: 3000, cost: 10000, gain: -5000, id: "4" },
  ];
  const config = [
    { label: "#", render: (data) => data.id },
    {
      label: "個股代碼",
      render: (data) => (
        <Link
          to={`/stock/${data.symbol}`}
          onClick={() => handleClick(data.symbol)}
        >
          {data.symbol}
        </Link>
      ),
    },
    {
      label: "持有股數",
      render: (data) => data.quantity,
    },
    {
      label: "平均成本",
      render: (data) => data.cost,
    },
    {
      label: "收益",
      render: (data) => data.gain,
    },
  ];
  return (
    <div>
      <TableContainer>
        <Table config={config} datas={datas} />
      </TableContainer>
    </div>
  );
}

export default SumPage;
