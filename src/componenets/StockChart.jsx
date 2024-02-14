import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function StockChart({ allDividend }) {
  const rendered = allDividend.map((data) => {
    return {
      name: data.dividendDate,
      持有股數: data.sharesHold,
      配息金額: +data.amount.toFixed(2),
      收益: +(data.amount * data.sharesHold).toFixed(0),
    };
  });

  return (
    <div style={{ width: "100%", height: 300 }}>
      {rendered.length ? (
        <ResponsiveContainer>
          <ComposedChart
            data={rendered}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, stroke: "#f1f5f9" }}
              tickMargin={24}
              angle={-30}
              height={50}
              reversed={true}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              label={{
                value: "收益(元)",
                angle: -90,
                position: "insideBottomLeft",
                stroke: "#f1f5f9",
              }}
              tickMargin={14}
              width={80}
              tick={{ fontSize: 14, stroke: "#f1f5f9" }}
              tickFormatter={(value) => value.toLocaleString("zh-TW")}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "配息(元)",
                angle: -90,
                position: "insideRight",
                stroke: "#f1f5f9",
              }}
              tickMargin={10}
              width={80}
              tick={{ fontSize: 14, stroke: "#f1f5f9" }}
              tickFormatter={(value) => value.toFixed(1)}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(55, 65, 81, 0.93)",
                border: "none",
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ top: -5 }} />
            <Bar dataKey="收益" barSize={20} fill="#facc15" yAxisId="left" />
            <Line
              type="monotone"
              dataKey="配息金額"
              stroke="#fb7185"
              activeDot={{ r: 8 }}
              strokeWidth={3}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-2xl h-full flex items-center justify-center">
          目前沒有配息資料
        </div>
      )}
    </div>
  );
}

export default StockChart;
