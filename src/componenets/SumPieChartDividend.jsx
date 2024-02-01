import { PieChart, Pie, Cell } from "recharts";
import Button from "./Button";
import { Link } from "react-router-dom";

// const COLORS = [
//   "#FFBB28",
//   "#FF8042",
//   "#ef4444",
//   "#9333ea",
//   "#0088FE",
//   "#00C49F",
// ];

function SumPieChart({ datas, total, COLORS }) {
  const renderedData = datas.map((data) => {
    return { ...data, costPercentage: data.stockIncome / total };
  });

  return (
    <div className="relative mb-8">
      <div className="absolute inset-24 font-bold text-lg flex flex-col justify-center items-center">
        <p>TWD</p>
        <p>{total.toLocaleString("zh-TW")}</p>
      </div>
      <Link to="/newdividend">
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
        >
          {renderedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index < COLORS.length ? COLORS[index] : "black"}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default SumPieChart;
