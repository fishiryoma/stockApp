import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useRef, useEffect, useState } from "react";

const RED = "#e03131";
const GREEN = "#2f9e44";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const textColor = value >= 0 ? "red" : "green";
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
          <p>{`損益: ${value} 元`}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function SumMarginChart({ datas }) {
  return (
    <ResponsiveContainer height="75%">
      <MarginBar datas={datas} />
      <BarChart
        width={500}
        data={datas?.marginRecap}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <ReferenceLine
          x={0}
          stroke="white"
          strokeDasharray="3 3"
          isFront={true}
          strokeWidth={2}
        />
        <XAxis
          tick={{ stroke: "#f1f5f9" }}
          tickMargin={24}
          height={70}
          type="number"
          orientation="bottom"
          domain={([dataMin, dataMax]) => {
            const absMax = 1.2 * Math.max(Math.abs(dataMin), Math.abs(dataMax));
            return [-absMax, absMax];
          }}
          tickFormatter={(value) => value.toLocaleString("zh-TW")}
        >
          <Label value="(元)" offset={-15} position="bottom" stroke="#f1f5f9" />
        </XAxis>
        <YAxis
          dataKey="name"
          type="category"
          tick={{ stroke: "#f1f5f9", fontSize: "12px" }}
          tickMargin={20}
          width={80}
        />
        <Tooltip
          cursor={{ fill: "rgb(55, 65, 81, 0.80)" }}
          content={<CustomTooltip />}
        />
        <Bar dataKey="stockMargin" maxBarSize={20}>
          {datas &&
            datas.marginRecap.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.stockMargin >= 0 ? RED : GREEN}
              />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function MarginBar({ datas }) {
  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (barRef.current) {
      const width = barRef.current.offsetWidth;
      setBarWidth(width);
    }
  }, [barRef]);

  const nTotal = datas?.marginRecap.reduce((acc, cur) => {
    if (cur.stockMargin < 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);
  const pTotal = datas?.marginRecap.reduce((acc, cur) => {
    if (cur.stockMargin >= 0) {
      return Math.abs(cur.stockMargin) + acc;
    }
    return acc;
  }, 0);

  const nPercentage = nTotal / (pTotal + nTotal);
  const pPercentage = pTotal / (pTotal + nTotal);

  return (
    <>
      <div className="text-center text-2xl mb-3">
        {datas?.totalMargin.toLocaleString("zh-TW")}元
      </div>
      <div className="w-full mx-auto flex justify-between mb-3">
        <div>-{nTotal && nTotal.toLocaleString("zh-TW")}元</div>
        <div>+{pTotal && pTotal.toLocaleString("zh-TW")}元</div>
      </div>
      <div
        ref={barRef}
        className="w-full mx-auto h-8 mb-9 flex rounded-3xl"
        style={{
          backgroundImage: `linear-gradient(to right, ${GREEN} ${
            nPercentage * barWidth
          }px, ${RED} ${pPercentage * barWidth}px)`,
        }}
      ></div>
    </>
  );
}
