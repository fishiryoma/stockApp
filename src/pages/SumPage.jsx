import Table from "../componenets/Table";
import Button from "../componenets/Button";
import { TableContainer, Container } from "../componenets/Container";
import { Link } from "react-router-dom";
import { useContext } from "react";
import StockContext from "../contexts/StockContext";
import SumPieChart from "../componenets/SumPieChart";
import SumLineChart from "../componenets/SumLineChart";

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
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const config = [
    {
      label: "股票",
      render: (data, index) => (
        <div className="font-bold" style={{ color: COLORS[index] }}>
          {data.name}
        </div>
      ),
    },
    {
      label: "成本比例",
      render: (data) => data.gain,
    },
    {
      label: "持有張數",
      render: (data) => data.quantity,
    },
    {
      label: "平均成本",
      render: (data) => data.cost,
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
            buttonClass="bg-gray-500 hover:bg-gray-300 hover:text-gray-800 text-sm"
          />
        </Link>
      ),
    },
  ];
  return (
    <Container className="flex flex-col items-center gap-8 px-1 bg-gray-800 text-white">
      <p className="m-2 text-2xl font-bold">資產趨勢</p>
      <div className="w-full h-80 md:w-4/5 md:h-96 lg:w-3/5 ">
        <SumLineChart />
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">證劵組成</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-20 md:flex-row md:gap-4">
          <SumPieChart />
          <TableContainer>
            <Table config={config} datas={datas} />
          </TableContainer>
        </div>
      </div>
    </Container>
  );
}

export default SumPage;
