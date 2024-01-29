import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "2024/1月",
    配息金額: 590,
    正效益: 800,
    持有股數: 1400,
  },
  {
    name: "2024/2月",
    配息金額: 868,
    正效益: 967,
    持有股數: 1506,
  },
  {
    name: "2024/3月",
    配息金額: 1397,
    正效益: 1098,
    持有股數: 989,
  },
  {
    name: "2024/4月",
    配息金額: 1480,
    正效益: 1200,
    持有股數: 1228,
  },
  {
    name: "2024/5月",
    配息金額: 1520,
    正效益: 1108,
    持有股數: 1100,
  },
  {
    name: "2024/6月",
    配息金額: 1400,
    正效益: 680,
    持有股數: 1700,
  },
];

function StockChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="持有股數"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="正效益" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="配息金額" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
