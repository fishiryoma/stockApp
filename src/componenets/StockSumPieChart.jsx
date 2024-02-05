import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#f43f5e", "#059669"];

function StockSumPieChart({ datas }) {
  const rendered = [
    {
      name: "配息",
      value: Math.abs(datas.accIncome / datas.totalCost),
      symbol: datas.accIncome / datas.totalCost,
    },
    {
      name: "報酬率",
      value: Math.abs(datas.totalReturn / datas.totalCost),
      symbol: datas.totalReturn / datas.totalCost,
    },
  ];
  // console.log(rendered);

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

    return (
      <text
        x={x + 13}
        y={y - 20}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "1rem" }}
      >
        {`${rendered[index].name}: ${rendered[index].symbol >= 0 ? "" : "-"}${(
          percent * 100
        ).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={rendered}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        dataKey="value"
        startAngle={-270}
      >
        {rendered.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index]}
            stroke="#e7e5e4"
            strokeWidth={2}
          />
        ))}
      </Pie>
    </PieChart>
  );
}

export default StockSumPieChart;
