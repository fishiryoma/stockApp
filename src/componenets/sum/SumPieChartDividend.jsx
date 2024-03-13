import { PieChart, Pie, Cell } from "recharts";
import Button from "../Button";
import { Link } from "react-router-dom";

function SumPieChart({ datas, COLORS }) {
  const renderedData =
    datas &&
    datas?.dividendsRecap.map((data) => {
      return {
        ...data,
        costPercentage: data.stockIncome / datas?.totalIncome,
      };
    });

  return (
    <div className="relative mb-8">
      <div>
        <div className="absolute inset-24 font-bold text-lg flex flex-col justify-center items-center">
          <p>TWD</p>
          <p>{datas?.totalIncome.toLocaleString("zh-TW")}</p>
        </div>
        <Link to="/mypage/newdividend">
          <Button
            text="新增配息"
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
                  fill={index < COLORS.length ? COLORS[index] : "black"}
                />
              ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default SumPieChart;
