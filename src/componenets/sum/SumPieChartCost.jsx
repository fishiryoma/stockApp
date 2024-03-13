import { PieChart, Pie, Cell } from "recharts";
import Button from "../Button";
import { Link } from "react-router-dom";

function SumPieChartCost({ datas, COLORS }) {
  const renderedData = datas?.costRecap.map((data) => {
    return {
      ...data,
      costPercentage: data.stockCost / datas?.totalCost,
    };
  });

  return (
    <div className="relative mb-8">
      <div>
        <div className="absolute inset-24 font-bold text-lg flex flex-col justify-center items-center">
          <p>TWD</p>
          <p>{datas?.totalCost.toLocaleString("zh-TW")}</p>
        </div>
        <Link to="/mypage/newtransc">
          <Button
            text="新增交易"
            buttonClass="z-10 absolute -bottom-11 left-1/2 -translate-x-1/2 bg-gray-500 hover:bg-gray-300 hover:text-gray-800 font-bold text-sm px-6 py-2"
          />
        </Link>
        <PieChart width={300} height={200}>
          <Pie
            data={renderedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="costPercentage"
            startAngle={-270}
          >
            {renderedData &&
              renderedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.costPercentage <= 0.05 && index >= COLORS.length
                      ? "black"
                      : COLORS[index]
                  }
                />
              ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default SumPieChartCost;
