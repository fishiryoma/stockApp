import Table from "../componenets/Table";
import Button from "../componenets/Button";
import { TableContainer, Container } from "../componenets/Container";
import { Link } from "react-router-dom";
import { useContext } from "react";
import StockContext from "../contexts/StockContext";
import Example from "../componenets/PieChart";

function SumPage() {
  const { getName } = useContext(StockContext);

  const handleClick = (name) => {
    getName(name);
  };
  const datas = [
    {
      symbol: "00878",
      name: "國泰永續高股息",
      quantity: 3000,
      cost: 10000,
      gain: -5000,
      id: "1",
    },
    {
      symbol: "2330",
      name: "台積電",
      quantity: 3000,
      cost: 10000,
      gain: -5000,
      id: "2",
    },
    {
      symbol: "1234",
      name: "假數據1",
      quantity: 3000,
      cost: 10000,
      gain: -5000,
      id: "3",
    },
    {
      symbol: "3310",
      name: "假數據2",
      quantity: 3000,
      cost: 10000,
      gain: -5000,
      id: "4",
    },
  ];
  const config = [
    { label: "#", render: (data) => data.id },
    {
      label: "個股代碼",
      render: (data) => data.symbol,
    },
    { label: "名稱", render: (data) => data.name },
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
    {
      label: "",
      render: (data) => (
        <Link
          to={`/stock/${data.symbol}`}
          onClick={() => handleClick({ symbol: data.symbol, name: data.name })}
        >
          <Button
            text="詳細"
            buttonClass="bg-blue-400 hover:bg-blue-500 text-sm"
          />
        </Link>
      ),
    },
  ];
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <TableContainer>
          <Table config={config} datas={datas} />
        </TableContainer>
        <Example />
      </div>
    </Container>
  );
}

export default SumPage;
