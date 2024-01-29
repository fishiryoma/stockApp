import { PieChart, Pie, Cell } from "recharts";
import Button from "./Button";

const data = [
  {
    symbol: "00878",
    name: "國泰永續高股息",
    quantity: 30,
    cost: 10000,
    gain: -5000,
    id: "1",
  },
  {
    symbol: "2330",
    name: "台積電",
    quantity: 30,
    cost: 10000,
    gain: -5000,
    id: "2",
  },
  {
    symbol: "1234",
    name: "假數據1",
    quantity: 25,
    cost: 10000,
    gain: -5000,
    id: "3",
  },
  {
    symbol: "3310",
    name: "假數據2",
    quantity: 10,
    cost: 10000,
    gain: -5000,
    id: "4",
  },
  {
    symbol: "3310",
    name: "假數據2",
    quantity: 3,
    cost: 10000,
    gain: -5000,
    id: "4",
  },
  {
    symbol: "3310",
    name: "假數據2",
    quantity: 2,
    cost: 10000,
    gain: -5000,
    id: "4",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function SumPieChart() {
  return (
    <div className="relative">
      <div className="absolute inset-32 font-bold text-lg flex flex-col justify-center items-center">
        <p>TWD</p>
        <p>100000</p>
      </div>
      <Button
        text="新增交易"
        buttonClass="z-10 absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-700 px-6 py-2"
      />
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="quantity"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.quantity >= 10 && index < COLORS.length
                  ? COLORS[index]
                  : "black"
              }
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default SumPieChart;
