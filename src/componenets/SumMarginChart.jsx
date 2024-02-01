import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Brush,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

function SumMarginChart({ datas }) {
  const rendered = datas.map((data) => {
    return { ...data, 已實現損益: data.stockMargin };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const textColor = value >= 0 ? "green" : "red";

      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.93)",
            border: "none",
            color: "black",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <p>{label}</p>
          <div
            style={{
              color: textColor,
            }}
          >
            <p>{`損益: ${value}`}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={rendered}
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
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          height={50}
        />
        <YAxis
          label={{
            value: "元(NTD)",
            angle: -90,
            position: "insideLeft",
            offset: -5,
            stroke: "#f1f5f9",
          }}
          tick={{ stroke: "#f1f5f9" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.93)",
            border: "none",
            color: "#000",
          }}
          cursor={{ fill: "rgb(55, 65, 81, 0.80)" }}
          content={<CustomTooltip />}
        />
        <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
        {datas.length >= 8 ? (
          <Brush dataKey="name" height={5} stroke="#d6d3d1" />
        ) : (
          ""
        )}
        <Bar dataKey="已實現損益">
          {datas.map((entry, index) => (
            <Cell
              fill={entry.stockMargin >= 0 ? "#15803d" : "#b91c1c"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SumMarginChart;
