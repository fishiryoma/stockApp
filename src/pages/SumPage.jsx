import Table from "../componenets/Table";
import Button from "../componenets/Button";
import { TableContainer, Container } from "../componenets/Container";
import { Link, useNavigate } from "react-router-dom";
import SumPieChartCost from "../componenets/SumPieChartCost";
import SumPieChartDividend from "../componenets/SumPieChartDividend";
import SumLineChart from "../componenets/SumLineChart";
import SumMarginChart from "../componenets/SumMarginChart";

import {
  getRecapCost,
  getRecapDividend,
  getRecapDiagram,
  getRecapMargin,
} from "../api/stock";
import { useState, useEffect } from "react";
import { useStock } from "../hooks/useStock";
import { useAuth } from "../hooks/useAuth";

function SumPage() {
  const [diagramRecap, setDiagramRecap] = useState([]);
  const [costRecap, setCostRecap] = useState([]);
  const [dividendRecap, setDividendReCap] = useState([]);
  const [marginRecap, setMarginRecap] = useState([]);
  const { isAuthenticated } = useAuth();
  const { setStockShowing } = useStock();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getRecapData = async () => {
      try {
        // 取得總覽線圖
        const diagramData = await getRecapDiagram(1);
        if (diagramData.success) {
          setDiagramRecap(getDiagramData(diagramData.data));
        }
        // 取得交易紀錄圓餅圖
        const costData = await getRecapCost();
        if (costData.success) {
          setCostRecap([{ costData: costData.data }]);
        }
        // 取得股利交易紀錄圓餅圖
        const dividnedData = await getRecapDividend();
        if (dividnedData.success) {
          setDividendReCap([{ dividnedData: dividnedData.data }]);
        }
        const marginData = await getRecapMargin();

        if (marginData.success) {
          setMarginRecap([{ marginData: marginData.data }]);
        }
      } catch (err) {
        console.log(`Get RecapData Failed ${err}`);
      }
    };
    getRecapData();
  }, []);

  const handleDiagramChange = async (period) => {
    try {
      const res = await getRecapDiagram(period);
      if (res.success) {
        setDiagramRecap(getDiagramData(res.data));
      }
    } catch (err) {
      console.log(`Get Diagram Data Failed ${err}`);
    }
  };

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
        `${((data.stockCost / costRecap[0].costData.totalCost) * 100).toFixed(
          0
        )}%`,
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
        <Link to={`/stock/${data.symbol}`}>
          <Button
            text="詳細"
            buttonClass="bg-gray-500 hover:bg-gray-300 hover:text-gray-800 text-sm"
            onClick={() => {
              setStockShowing([data]);
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
        `${(
          (data.stockIncome / dividendRecap[0].dividnedData.totalIncome) *
          100
        ).toFixed(0)}%`,
    },
    {
      label: "累積配息",
      render: (data) => data.stockIncome.toLocaleString("zh-TW"),
    },
  ];
  // console.log(marginRecap[0].marginData, "aaa");
  return (
    <Container className="flex flex-col items-center gap-12 bg-gray-800 text-white h-100">
      <p className="m-2 text-2xl font-bold">資產趨勢</p>
      <div className="w-full h-80 md:w-4/5 md:h-96 lg:w-3/5 mb-10">
        <SumLineChart
          datas={diagramRecap}
          handleDiagramChange={handleDiagramChange}
        />
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">證劵組成</p>

      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4 max-w-7xl mx-auto">
          <SumPieChartCost datas={costRecap} COLORS={costCOLORS} />
          {costRecap.length ? (
            <TableContainer>
              <Table
                config={costConfig}
                datas={costRecap[0].costData.costRecap}
              />
            </TableContainer>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">配息狀況</p>
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-4 max-w-7xl mx-auto">
          <div className="md:order-last">
            <SumPieChartDividend
              datas={dividendRecap}
              COLORS={dividendCOLORS}
            />
          </div>
          {dividendRecap.length ? (
            <TableContainer>
              <Table
                config={dividendConfig}
                datas={dividendRecap[0].dividnedData.dividendsRecap}
              />
            </TableContainer>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="m-2 mb-0 text-2xl font-bold">已實現損益</p>
      <div className="w-full h-[500px] md:w-4/5 lg:w-3/5 ">
        {marginRecap.length ? (
          <SumMarginChart datas={marginRecap[0].marginData} />
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default SumPage;
