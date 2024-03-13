import AllTransaction from "../componenets/stock/AllTransaction";
import AllDividend from "../componenets/stock/AllDividend";
import StockSumTable from "../componenets/stock/StockSumTable";
import DividendChart from "../componenets/stock/DividendChart";
import { Container } from "../componenets/Container";
import { useState, useEffect, useCallback } from "react";
import { useStock } from "../hooks/useStock";
import {
  getTranscByStockId,
  getDividendByStockId,
  getAbstractByStockId,
} from "../api/stock";

export default function StockPage({ stock }) {
  const { stockShowing } = useStock();
  const renderedStock = stock ? stock : stockShowing;

  return (
    <Container className="bg-gray-800 text-white block xl:flex">
      <div>
        <p className="text-3xl mb-8 2xl:ml-10">{`${renderedStock?.symbol} ${renderedStock?.name}`}</p>
        <StockDetail renderedStock={renderedStock} />
      </div>
    </Container>
  );
}

function StockDetail({ renderedStock }) {
  // 交易
  const [allTransc, setAllTransc] = useState([]);
  const [transcPage, setTranscPage] = useState(1);

  // 股利
  const [allDividend, setAllDividend] = useState([]);
  const [dividendPage, setDividendPage] = useState(1);

  // 總覽
  const [abstract, setAbstract] = useState(null);

  const getAllTransaction = useCallback(async () => {
    try {
      const res = await getTranscByStockId(renderedStock?.id, transcPage);
      if (res.success) {
        // 測試用
        // console.log(res.data.transactions);
        setAllTransc(res.data.transactions);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }, [renderedStock?.id, transcPage]);

  const getAllDividend = useCallback(async () => {
    try {
      const res = await getDividendByStockId(renderedStock?.id, dividendPage);
      // 測試用
      // console.log(res.data.dividends);
      if (res.success) {
        setAllDividend(res.data.dividends);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }, [renderedStock?.id, dividendPage]);

  const getAbstract = useCallback(async () => {
    try {
      const res = await getAbstractByStockId(renderedStock?.symbol);
      // 測試用
      // console.log(res);
      if (res.success) {
        setAbstract(res.data.abstract);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }, [renderedStock?.symbol]);

  const updateAllDate = () => {
    getAllTransaction();
    getAllDividend();
    getAbstract();
  };

  useEffect(() => {
    getAllTransaction();
    getAllDividend();
    getAbstract();
  }, [getAllTransaction, getAllDividend, getAbstract]);

  return (
    <div className="w-full flex flex-col gap-y-10 md:grid md:grid-rows-2 md:grid-cols-[55fr_45fr] md:items-center xl:gap-x-16">
      {/* 總整 */}
      <div className="md:col-start-2 md:row-start-1 w-full ">
        <StockSumTable
          abstract={abstract}
          getAbstract={getAbstract}
          allTransc={allTransc}
          allDividend={allDividend}
        />
      </div>
      {/* 交易紀錄TABLE */}
      <div className="md:col-start-1 md:row-start-1 flex justify-center">
        <AllTransaction
          allTransc={allTransc}
          transcPage={transcPage}
          setTranscPage={setTranscPage}
          updateAllDate={updateAllDate}
        />
      </div>
      <div className="min-w-[30rem] md:col-start-2 md:row-start-2">
        {/* 圖表 */}
        <DividendChart allDividend={allDividend} />
      </div>
      {/* 股利TABLE */}
      <div className="md:col-start-1 md:row-start-2 flex justify-center">
        <AllDividend
          allDividend={allDividend}
          dividendPage={dividendPage}
          setDividendPage={setDividendPage}
          updateAllDate={updateAllDate}
        />
      </div>
    </div>
  );
}
