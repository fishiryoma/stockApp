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

function SumLineChart({ datas, handleDiagramChange }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 flex-col gap-8"
          style={{
            backgroundColor: "rgb(55, 65, 81, 0.93)",
            border: "none",
          }}
        >
          <p>{`${label}`}</p>
          <p style={{ color: payload[0].stroke }}>{`${
            payload[0].dataKey
          }: ${payload[0].value.toLocaleString("zh-TW")} 元`}</p>
          <p style={{ color: payload[1].stroke }}>{`${
            payload[1].dataKey
          }: ${payload[1].value.toLocaleString("zh-TW")} 元`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer>
      <div className="mx-8 mb-5 ml-auto w-2/5 md:w-2/5 lg:w-2/6">
        <select
          className="select select-sm w-full bg-gray-600"
          onChange={(e) => {
            handleDiagramChange(+e.target.value);
          }}
        >
          <option value="1">近一年</option>
          <option value="3">近三年</option>
          <option value="6">近六年</option>
          <option value="12">所有數據</option>
        </select>
      </div>
      <LineChart
        width={500}
        height={300}
        data={datas}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 14, stroke: "#f1f5f9" }}
          tickMargin={24}
          angle={-30}
          height={60}
        />
        <YAxis
          label={{
            value: "萬元(NTD)",
            angle: -90,
            position: "insideLeft",
            // offset: -5,
            stroke: "#f1f5f9",
          }}
          tickMargin={14}
          width={80}
          tick={{ stroke: "#f1f5f9" }}
          tickFormatter={(value) => value / 10000}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" wrapperStyle={{ top: -15 }} />
        <Line
          type="monotone"
          dataKey="累積配息"
          stroke="#FFBB28"
          activeDot={{ r: 8 }}
          strokeWidth={3}
          isAnimationActive={true}
        />
        <Line
          type="monotone"
          dataKey="花費成本"
          stroke="#00C49F"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SumLineChart;
