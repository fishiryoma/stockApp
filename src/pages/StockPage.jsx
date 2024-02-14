import AllTransaction from "../componenets/AllTransaction";
import AllDividend from "../componenets/AllDividend";
import StockSumTable from "../componenets/StockSumTable";
import StockChart from "../componenets/StockChart";
import { Container } from "../componenets/Container";
import { useState, useEffect } from "react";
import { useStock } from "../hooks/useStock";
import {
  getTranscByStockId,
  getDividendByStockId,
  getAbstractByStockId,
} from "../api/stock";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function StockPage({ stock = [] }) {
  // 交易
  const [allTransc, setAllTransc] = useState([]);
  const [transcPage, setTranscPage] = useState(1);

  // 股利
  const [allDividend, setAllDividend] = useState([]);
  const [dividendPage, setDividendPage] = useState(1);

  // 總覽
  const [abstract, setAbstract] = useState([]);
  const { stockShowing } = useStock();
  const renderedStock = stock.length ? stock[0] : stockShowing[0];
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const getAllTransaction = async () => {
    const res = await getTranscByStockId(renderedStock.id, transcPage);
    if (res.success) {
      // 測試用
      // console.log(res.data.transactions);
      setAllTransc(res.data.transactions);
    }
  };

  const getAllDividend = async () => {
    try {
      const res = await getDividendByStockId(renderedStock.id, dividendPage);
      // 測試用
      // console.log(res.data.dividends);
      if (res.success) {
        setAllDividend(res.data.dividends);
      }
    } catch (err) {
      console.log(`Get Stock Abstract Failed ${err}`);
    }
  };

  const getAbstract = async () => {
    try {
      const res = await getAbstractByStockId(renderedStock.symbol);
      // 測試用
      // console.log(res);
      if (res.success) {
        setAbstract([res.data.abstract]);
      }
    } catch (err) {
      console.log(`Get Stock Abstract Failed ${err}`);
    }
  };

  useEffect(() => {
    getAllTransaction();
    getAllDividend();
    getAbstract();
  }, [renderedStock]);

  return (
    <Container className="bg-gray-800 text-white">
      <p className="text-3xl mb-8 2xl:ml-10">{`${renderedStock.symbol} ${renderedStock.name}`}</p>
      <div className="flex flex-col gap-y-10 lg:grid lg:grid-rows-2 lg:grid-cols-[65fr_35fr] lg:gap-y-4 lg:items-center xl:gap-x-5 2xl:gap-x-10">
        {/* 總整 */}
        <div className="lg:col-start-2 lg:row-start-1 w-full ">
          <StockSumTable
            abstract={abstract}
            getAbstract={getAbstract}
            allTransc={allTransc}
            allDividend={allDividend}
          />
        </div>
        {/* 圖表 */}
        <StockChart allDividend={allDividend} />
        {/* 交易紀錄TABLE */}
        <div className="lg:col-start-1 lg:row-start-1 flex justify-center">
          <AllTransaction
            allTransc={allTransc}
            getAllTransaction={getAllTransaction}
            transcPage={transcPage}
            setTranscPage={setTranscPage}
          />
        </div>
        {/* 股利TABLE */}
        <div className="lg:col-start-1 lg:row-start-2 flex justify-center">
          <AllDividend
            allDividend={allDividend}
            getAllDividend={getAllDividend}
            dividendPage={dividendPage}
            setDividendPage={setDividendPage}
          />
        </div>
      </div>
    </Container>
  );
}

export default StockPage;
