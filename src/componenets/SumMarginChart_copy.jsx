import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Brush,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  // ReferenceLine,
} from "recharts";

function SumMarginChart({ datas }) {
  console.log(datas);
  console.log(datas.marginRecap);
  console.log(datas.totalMargin);

  const nTotal = datas.marginRecap.reduce((acc, cur) => {
    if (cur.stockMargin < 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);
  const pTotal = datas.marginRecap.reduce((acc, cur) => {
    if (cur.stockMargin >= 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);

  return (
    <ResponsiveContainer height="75%">
      <div className="text-center text-3xl mb-3">
        {datas.totalMargin.toLocaleString("zh-TW")}元
      </div>
      <div className="w-3/5 mx-auto flex justify-between mb-3">
        <div>-{nTotal.toLocaleString("zh-TW")}元</div>
        <div>+{pTotal.toLocaleString("zh-TW")}元</div>
      </div>
      <div className="w-3/5 mx-auto h-8 mb-9 flex border-gray-300 border-2 rounded-3xl">
        <div
          className="bg-green-700 rounded-l-3xl "
          style={{
            width: `${(100 * nTotal) / Math.abs(datas.totalMargin)}%`,
          }}
        ></div>
        <div
          className="bg-red-700 rounded-r-3xl"
          style={{
            width: `${(100 * pTotal) / Math.abs(datas.totalMargin)}%`,
          }}
        ></div>
      </div>
      <BarChart
        width={500}
        height={300}
        data={datas.marginRecap}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          height={50}
          type="number"
          orientation="top"
          domain={([dataMin, dataMax]) => {
            const absMax = 1.2 * Math.max(Math.abs(dataMin), Math.abs(dataMax));
            return [-absMax, absMax];
          }}
        />

        <YAxis
          dataKey="name"
          type="category"
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          width={80}
        />
        <Tooltip />
        <Legend />

        <Bar dataKey="stockMargin">
          {datas.marginRecap.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.stockMargin >= 0 ? "#b91c1c" : "#15803d"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SumMarginChart;
