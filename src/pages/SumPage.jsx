import Table from "../componenets/Table";
import Button from "../componenets/Button";
import { TableContainer, Container } from "../componenets/Container";
import { Link } from "react-router-dom";
import SumPieChartCost from "../componenets/sum/SumPieChartCost";
import SumPieChartDividend from "../componenets/sum/SumPieChartDividend";
import SumLineChart from "../componenets/sum/SumLineChart";
import SumMarginChart from "../componenets/sum/SumMarginChart";
import {
  getRecapCost,
  getRecapDividend,
  getRecapDiagram,
  getRecapMargin,
} from "../api/stock";
import { useState, useEffect } from "react";
import { useStock } from "../hooks/useStock";

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
  "#00C49F",
  "#0088FE",
  "#ef4444",
  "#FF8042",
  "#9333ea",
];

export default function SumPage() {
  return (
    <Container className="flex flex-col items-center gap-12 bg-gray-800 text-white h-100">
      <EstateTrend />
      <StockComposition />
      <DividendProfit />
      <MarginChart />
    </Container>
  );
}

//  處理數據成表格能用的格式
const getDiagramData = (variable) => {
  const result = [];
  for (let i = 0; i < variable.monthArr.length; i++) {
    const obj = {};
    obj.累積配息 = [variable.accIncomeArr[i]];
    obj.花費成本 = [variable.investmentCostArr[i]];
    obj.time = [variable.monthArr[i]];
    result.push(obj);
  }
  return result;
};
function EstateTrend() {
  const [diagramRecap, setDiagramRecap] = useState([]);

  const handleDiagramChange = async (period) => {
    try {
      const res = await getRecapDiagram(period);
      if (res.success) {
        setDiagramRecap(getDiagramData(res.data));
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    const getRecapData = async () => {
      try {
        // 取得總覽線圖
        const diagramData = await getRecapDiagram(1);
        if (diagramData.success) {
          setDiagramRecap(getDiagramData(diagramData.data));
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    getRecapData();
  }, []);

  return (
    <>
      <p className="m-2 text-2xl font-bold">資產趨勢</p>
      <div className="w-full h-80 md:w-4/5 md:h-96 lg:w-3/5 mb-10">
        <SumLineChart
          datas={diagramRecap}
          handleDiagramChange={handleDiagramChange}
        />
      </div>
    </>
  );
}

function StockComposition() {
  const [costRecap, setCostRecap] = useState(null);
  const { setStockShowing } = useStock();
  useEffect(() => {
    const getRecapData = async () => {
      try {
        // 取得交易紀錄圓餅圖
        const costData = await getRecapCost();
        if (costData.success) {
          setCostRecap(costData.data);
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    getRecapData();
  }, []);

  const costConfig = [
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
      render: (data) =>
        `${((data.stockCost / costRecap?.totalCost) * 100).toFixed(0)}%`,
    },
    {
      label: "持有張數",
      render: (data) => (data.sharesHold / 1000).toFixed(2),
    },
    {
      label: "平均成本",
      render: (data) => (data.stockCost / data.sharesHold).toFixed(2),
    },
    {
      label: "",
      render: (data) => (
        <Link to={`/mypage/stock/${data.symbol}`}>
          <Button
            text="詳細"
            buttonClass="bg-gray-500 hover:bg-gray-300 hover:text-gray-800 text-sm"
            onClick={() => {
              setStockShowing(data);
            }}
          />
        </Link>
      ),
    },
  ];
  return (
    <>
      <p className="m-2 mb-0 text-2xl font-bold">證劵組成</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4 max-w-7xl mx-auto">
          <SumPieChartCost datas={costRecap} COLORS={costCOLORS} />
          <TableContainer>
            <Table
              config={costConfig}
              datas={costRecap?.costRecap}
              TheadClass="text-xl"
              TbodyClass="text-xl"
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}

function DividendProfit() {
  const [dividendRecap, setDividendReCap] = useState(null);

  useEffect(() => {
    const getRecapData = async () => {
      try {
        // 取得股利交易紀錄圓餅圖
        const dividnedData = await getRecapDividend();
        if (dividnedData.success) {
          setDividendReCap(dividnedData.data);
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    getRecapData();
  }, []);

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
        `${((data.stockIncome / dividendRecap?.totalIncome) * 100).toFixed(
          0
        )}%`,
    },
    {
      label: "累積配息",
      render: (data) => data.stockIncome.toLocaleString("zh-TW"),
    },
  ];
  return (
    <>
      <p className="m-2 mb-0 text-2xl font-bold">配息狀況</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4 max-w-7xl mx-auto">
          <div className="md:order-last">
            <SumPieChartDividend
              datas={dividendRecap}
              COLORS={dividendCOLORS}
            />
          </div>
          <TableContainer>
            <Table
              config={dividendConfig}
              datas={dividendRecap?.dividendsRecap}
              TheadClass="text-xl"
              TbodyClass="text-xl"
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}

function MarginChart() {
  const [marginRecap, setMarginRecap] = useState(null);

  useEffect(() => {
    const getRecapData = async () => {
      try {
        const marginData = await getRecapMargin();
        if (marginData.success) {
          // console.log(marginData);
          setMarginRecap(marginData.data);
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };
    getRecapData();
  }, []);
  return (
    <>
      <p className="m-2 mb-0 text-2xl font-bold">已實現損益</p>
      <div className="w-full max-w-7xl max-h-[50rem] h-full ">
        <SumMarginChart datas={marginRecap} />
      </div>
    </>
  );
}
