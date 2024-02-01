function StockSumTable({ datas }) {
  return (
    <div className=" flex flex-col gap-4 sm:flex-row sm:text-xl sm:flex sm:justify-around">
      <div className="flex items-center gap-6">
        <p className="border-2 rounded px-5 py-2">總效益</p>
        <p>{`${datas.totalReturn.toLocaleString("zh-TW")} 元`}</p>
      </div>
      <div className="ml-2 sm:ml-0 flex flex-col items-start gap-3">
        <div className="flex gap-2 border-b-2 border-amber-300">
          <p>持有股數</p>
          <p className="">{`${datas.sharesHold}股`}</p>
        </div>
        <div className="flex gap-2 border-b-2 border-amber-300">
          <p>總成本</p>
          <p>{`${datas.totalCost.toLocaleString("zh-TW")}元`}</p>
        </div>
        <div className="flex gap-2 border-b-2 border-amber-300">
          <p>平均持有成本</p>
          <p>{`${datas.avgCost.toFixed(2)}元`}</p>
        </div>
        <div className="flex gap-2 border-b-2 border-amber-300">
          <p>累績正效益</p>
          <p>{`${datas.accIncome.toLocaleString("zh-TW")}元`}</p>
        </div>
      </div>
    </div>
  );
}

export default StockSumTable;
