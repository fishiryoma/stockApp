import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function SumMarginChart({ datas }) {
  const rendered = datas.map((data) => {
    if (data.stockMargin >= 0) {
      return { ...data, 盈餘: data.stockMargin, pName: data.name };
    }
    return { ...data, 虧損: data.stockMargin, nName: data.name };
  });

  const maxNumber = (
    1.3 * Math.max(...datas.map((item) => Math.abs(item.stockMargin)))
  ).toFixed(0);
  const absTotal = datas.reduce((acc, cur) => {
    return Math.abs(cur.stockMargin) + acc;
  }, 0);
  const nTotal = datas.reduce((acc, cur) => {
    if (cur.stockMargin < 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);
  const pTotal = datas.reduce((acc, cur) => {
    if (cur.stockMargin >= 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);
  // console.log(absTotal, "total");
  // console.log(nTotal, "ntotal");
  // console.log(pTotal, "ptotal");
  // console.log(pTotal / absTotal);
  // console.log(nTotal / absTotal);
  // console.log(maxNumber);

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     const value = payload[0].value;
  //     const textColor = value >= 0 ? "red" : "green";
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "rgba(255, 255, 255, 0.93)",
  //           border: "none",
  //           color: "black",
  //           padding: "10px",
  //           display: "flex",
  //           flexDirection: "column",
  //           gap: "3px",
  //         }}
  //       >
  //         <p>{label}</p>
  //         <div
  //           style={{
  //             color: textColor,
  //           }}
  //         >
  //           <p>{`損益: ${value}`}</p>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  return (
    <ResponsiveContainer height="75%">
      <div className="text-center text-3xl mb-3">
        {(pTotal - nTotal).toLocaleString("zh-TW")}元
      </div>
      <div className="w-3/5 mx-auto flex justify-between">
        <div>+{pTotal.toLocaleString("zh-TW")}元</div>
        <div>-{nTotal.toLocaleString("zh-TW")}元</div>
      </div>
      <div className="w-3/5 mx-auto h-8 mb-9 flex border-gray-300 border-2 rounded-3xl">
        <div
          className="bg-red-700 rounded-l-3xl"
          style={{ width: `${(100 * pTotal) / absTotal}%` }}
        ></div>
        <div
          className="bg-green-700 rounded-r-3xl "
          style={{ width: `${(100 * nTotal) / absTotal}%` }}
        ></div>
      </div>
      <BarChart
        data={rendered}
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
          xAxisId={0}
          orientation="top"
          domain={[0, +maxNumber]}
        />
        <XAxis
          type="number"
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          height={50}
          xAxisId={1}
          orientation="bottom"
          domain={[-maxNumber, 0]}
        />
        <YAxis
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          width={80}
          type="category"
          dataKey="pName"
          orientation="left"
          yAxisId={1}
        />
        <YAxis
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          width={80}
          type="category"
          dataKey="nName"
          orientation="right"
          yAxisId={0}
        />
        {/* <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.93)",
            border: "none",
            color: "#000",
          }}
          cursor={{ fill: "rgb(55, 65, 81, 0.80)" }}
          content={<CustomTooltip />}
        /> */}

        {/* <Legend verticalAlign="top" /> */}
        <Bar
          dataKey="盈餘"
          fill="#b91c1c"
          // barSize={20}
          xAxisId={0}
          yAxisId={1}
        />
        <Bar
          dataKey="虧損"
          fill="#15803d"
          // barSize={20}
          xAxisId={1}
          yAxisId={0}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SumMarginChart;
