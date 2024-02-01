import Table from "../componenets/Table";
import Button from "../componenets/Button";
import { TableContainer, Container } from "../componenets/Container";
import { Link } from "react-router-dom";
import SumPieChartCost from "../componenets/SumPieChartCost";
import SumPieChartDividend from "../componenets/SumPieChartDividend";
import SumLineChart from "../componenets/SumLineChart";
import SumMarginChart from "../componenets/SumMarginChart";
import { getRecapCost, getRecapDividend } from "../api/stock";
import { useState } from "react";
import { useStock } from "../hooks/useStock";

const totalCost = 292452;
const totalIncome = 18786;
const totalMargin = 100510;
const dummyCost = [
  {
    id: 2,
    symbol: "0056",
    name: "元大高股息",
    sharesHold: 5000,
    stockCost: 167387,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    sharesHold: 2000,
    stockCost: 125065,
  },
];
const dummyDividend = [
  {
    id: 2,
    symbol: "0056",
    name: "元大高股息",
    stockIncome: 12300,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockIncome: 1486,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockIncome: 1486,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockIncome: 1486,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockIncome: 1486,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockIncome: 1486,
  },
];

const dummyMargin = [
  {
    id: 5,
    symbol: "2330",
    name: "台積電",
    stockMargin: 850,
  },
  {
    id: 6,
    symbol: "006208",
    name: "富邦台50",
    stockMargin: 1560,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
  {
    id: 1,
    symbol: "00878",
    name: "國泰永續高股息",
    stockMargin: -900,
  },
];

function SumPage() {
  // const [costRecap, setCostRecap] = useState();
  // const [total, setTotalCost] = useState();
  // const [dividendRecap, setDividendReCap] = useState();
  // const [totalIncome, setTotalIncome] = useState();
  const { getStockBtn } = useStock();
  // useEffect(() => {
  //   const getRecapData = async () => {
  //     const costRes = await getRecapCost();
  //     const dividendRes = await getRecapDividend();
  //     if (costRes.success && dividendRes.success) {
  //       setCostRecap(costRes.data.costRecap);
  // setTotalCost(costRes.data.totalCost);
  //       setDividendReCap(dividendRes.data);
  //       setTotalIncome(dividendRes.data.dividendsRecap);
  //     }
  //   };
  // }, []);

  const costCOLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#ef4444",
    "#9333ea",
  ];
  const dividendCOLORS = [
    "#FFBB28",
    "#FF8042",
    "#ef4444",
    "#9333ea",
    "#0088FE",
    "#00C49F",
  ];

  const constConfig = [
    {
      label: "股票",
      render: (data, index) => (
        <div className="font-bold" style={{ color: costCOLORS[index] }}>
          {data.name}
        </div>
      ),
    },
    {
      label: "成本比例",
      render: (data) => `${((data.stockCost / totalCost) * 100).toFixed(0)}%`,
    },
    {
      label: "持有張數",
      render: (data) => data.sharesHold,
    },
    {
      label: "平均成本",
      render: (data) => (data.stockCost / data.sharesHold).toFixed(2),
    },
    {
      label: "",
      render: (data) => (
        <Link to={`/stock/${data.symbol}`}>
          <Button
            text="詳細"
            buttonClass="bg-gray-500 hover:bg-gray-300 hover:text-gray-800 text-sm"
            onClick={() => {
              getStockBtn(data);
            }}
          />
        </Link>
      ),
    },
  ];

  const dividendConfig = [
    {
      label: "股票",
      render: (data, index) => (
        <div className="font-bold" style={{ color: dividendCOLORS[index] }}>
          {data.name}
        </div>
      ),
    },
    {
      label: "配息占比",
      render: (data) =>
        `${((data.stockIncome / totalIncome) * 100).toFixed(0)}%`,
    },
    {
      label: "累積配息",
      render: (data) => data.stockIncome,
    },
  ];
  return (
    <Container className="flex flex-col items-center gap-12 px-1 bg-gray-800 text-white">
      <p className="m-2 text-2xl font-bold">資產趨勢</p>
      <div className="w-full h-80 md:w-4/5 md:h-96 lg:w-3/5 ">
        <SumLineChart />
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">證劵組成</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4">
          <SumPieChartCost
            datas={dummyCost}
            total={totalCost}
            COLORS={costCOLORS}
          />
          <TableContainer>
            <Table config={constConfig} datas={dummyCost} />
          </TableContainer>
        </div>
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">配息狀況</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4">
          <div className="md:order-last">
            <SumPieChartDividend
              datas={dummyDividend}
              total={totalIncome}
              COLORS={dividendCOLORS}
            />
          </div>
          <TableContainer>
            <Table config={dividendConfig} datas={dummyDividend} />
          </TableContainer>
        </div>
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">已實現損益</p>
      <div className="w-full h-80 md:w-4/5 md:h-96 lg:w-3/5 ">
        <SumMarginChart datas={dummyMargin} />
      </div>
    </Container>
  );
}

export default SumPage;
