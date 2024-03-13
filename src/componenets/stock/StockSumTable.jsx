export default function StockSumTable({ abstract }) {
  return (
    <div className=" flex flex-col items-center sm:flex-row sm:text-xl sm:flex sm:justify-center sm:gap-y-8 ">
      <div className="bg-white py-5 px-0 text-black rounded-md w-full max-w-md">
        <div>
          <div className="flex justify-center items-center gap-3 rounded-md bg-gray-200 text-gray-800 px-5 py-4 mx-4 text-base">
            <p className="">損益試算</p>
            <p
              className={`${
                abstract?.totalReturn < 0 ? "text-red-500" : ""
              } font-bold`}
            >{`${abstract?.totalReturn.toLocaleString("zh-TW")} 元`}</p>
          </div>
        </div>
        <TableRowData abstract={abstract} />
      </div>
    </div>
  );
}

function TableRowData({ abstract }) {
  const rowClass =
    "flex justify-between w-full gap-2 border-b-2 border-gray-500 pb-1";
  return (
    <div className="flex flex-col items-start gap-3 px-5 py-4 xl:px-10 text-base">
      <div className={rowClass}>
        <p>總成本</p>
        <p>{`${abstract?.totalCost.toLocaleString("zh-TW")}元`}</p>
      </div>
      <div className={rowClass}>
        <p>平均持有成本</p>
        {!abstract?.sharesHold ? (
          "0元"
        ) : (
          <p>{`${(abstract?.totalCost / abstract?.sharesHold).toFixed(
            2
          )}元`}</p>
        )}
      </div>
      <div className={rowClass}>
        <p>累績配息</p>
        <p>{`${abstract?.accIncome.toLocaleString("zh-TW")}元`}</p>
      </div>
      <div className={rowClass}>
        <p>持有股數</p>
        <p className="">{`${abstract?.sharesHold}股`}</p>
      </div>
    </div>
  );
}
