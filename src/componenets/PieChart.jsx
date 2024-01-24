import { PieChart, Pie, Cell } from "recharts";

const data = [
  {
    symbol: "00878",
    name: "國泰永續高股息",
    quantity: 3000,
    cost: 10000,
    gain: -5000,
    id: "1",
  },
  {
    symbol: "2330",
    name: "台積電",
    quantity: 3000,
    cost: 10000,
    gain: -5000,
    id: "2",
  },
  {
    symbol: "1234",
    name: "假數據1",
    quantity: 3000,
    cost: 10000,
    gain: -5000,
    id: "3",
  },
  {
    symbol: "3310",
    name: "假數據2",
    quantity: 3000,
    cost: 10000,
    gain: -5000,
    id: "4",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const fontSize = 14;
  const yOffset = 5;
  const xOffset = 0;
  return (
    <text
      x={x + xOffset}
      y={y + yOffset}
      fontSize={fontSize}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${data[index].name},`}
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="quantity"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
