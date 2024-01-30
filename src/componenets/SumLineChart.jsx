import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "2024.01",
    資產成本: 4000,
    累積配息: 2400,
    amt: 2400,
  },
  {
    name: "2024/2",
    資產成本: 3000,
    累積配息: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    資產成本: 2000,
    累積配息: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    資產成本: 2780,
    累積配息: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    資產成本: 1890,
    累積配息: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    資產成本: 2390,
    累積配息: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    資產成本: 3490,
    累積配息: 4300,
    amt: 2100,
  },
];

function SumLineChart() {
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 18 }}
          tickMargin={24}
          angle={-30}
          height={50}
        />
        <YAxis
          label={{
            value: "資產(NTD)",
            angle: -90,
            position: "insideLeft",
            offset: -5,
          }}
          tickMargin={14}
          width={80}
        />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line
          type="stepAfter"
          dataKey="累積配息"
          stroke="#FFBB28"
          activeDot={{ r: 8 }}
          strokeWidth={3}
          isAnimationActive={true}
        />
        <Line
          type="stepAfter"
          dataKey="資產成本"
          stroke="#00C49F"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SumLineChart;
