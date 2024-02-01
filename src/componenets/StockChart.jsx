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

function StockChart({ datas }) {
  const rendered = datas.map((data) => {
    return {
      name: data.dividendDate,
      持有股數: data.sharesHold,
      配息金額: data.amount.toFixed(3),
      正效益: (data.amount * data.sharesHold).toFixed(0),
    };
  });

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
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
            tick={{ fontSize: 16, stroke: "#f1f5f9" }}
            tickMargin={24}
            angle={-30}
            height={50}
          />
          <YAxis
            yAxisId={0}
            label={{
              value: "資產(NTD)",
              angle: -90,
              position: "insideBottomLeft",
              stroke: "#f1f5f9",
            }}
            tickMargin={14}
            width={80}
            tick={{ stroke: "#f1f5f9" }}
          />
          <YAxis
            yAxisId={1}
            orientation="right"
            label={{
              value: "配息(塊)",
              angle: -90,
              position: "insideRight",
              stroke: "#f1f5f9",
            }}
            tickMargin={14}
            width={80}
            tick={{ stroke: "#f1f5f9" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(55, 65, 81, 0.93)",
              border: "none",
            }}
          />
          <Legend verticalAlign="top" />
          <Bar dataKey="正效益" barSize={20} fill="#facc15" yAxisId={0} />
          <Line
            type="monotone"
            dataKey="持有股數"
            stroke="#34d399"
            activeDot={{ r: 8 }}
            strokeWidth={3}
            yAxisId={0}
          />
          <Line
            type="monotone"
            dataKey="配息金額"
            stroke="#fb7185"
            activeDot={{ r: 8 }}
            strokeWidth={3}
            yAxisId={1}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
