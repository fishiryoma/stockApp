import StockSumPieChart from "./StockSumPieChart";
import { useEffect } from "react";

function StockSumTable({ allTransc, allDividend, abstract, getAbstract }) {
  useEffect(() => {
    getAbstract();
  }, [allTransc, allDividend]);

  return (
    <div className=" flex flex-col items-center sm:flex-row sm:text-xl sm:flex sm:justify-center sm:gap-y-8 ">
      {abstract.length ? (
        <div>
          <div>
            <div className="flex justify-center items-center gap-3 rounded-md bg-gray-200 text-gray-800 px-5 py-4 mx-4 text-base">
              <p className="">損益試算</p>
              {abstract[0].totalReturn < 0 ? (
                <p className="text-red-500 font-bold">{`${abstract[0].totalReturn.toLocaleString(
                  "zh-TW"
                )} 元`}</p>
              ) : (
                <p className="font-bold">{`${abstract[0].totalReturn.toLocaleString(
                  "zh-TW"
                )} 元`}</p>
              )}
            </div>
            {/* <StockSumPieChart datas={abstract[0]} /> */}
          </div>
          <div className="ml-2 flex flex-col items-start gap-3 px-5 py-4 xl:px-10 text-base">
            <div className="flex justify-between w-full gap-2 border-b-2 border-gray-500 pb-1">
              <p>總成本</p>
              <p>{`${abstract[0].totalCost.toLocaleString("zh-TW")}元`}</p>
            </div>
            <div className="flex justify-between w-full gap-2 border-b-2 border-gray-500 pb-1">
              <p>平均持有成本</p>
              <p>{`${(abstract[0].totalCost / abstract[0].sharesHold).toFixed(
                2
              )}元`}</p>
            </div>
            <div className="flex justify-between w-full gap-2 border-b-2 border-gray-500 pb-1">
              <p>累績配息</p>
              <p>{`${abstract[0].accIncome.toLocaleString("zh-TW")}元`}</p>
            </div>
            <div className="flex justify-between w-full gap-2 border-b-2 border-gray-500 pb-1">
              <p>持有股數</p>
              <p className="">{`${abstract[0].sharesHold}股`}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default StockSumTable;
