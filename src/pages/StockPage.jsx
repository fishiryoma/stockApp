import { useContext } from "react";
import StockContext from "../contexts/StockContext";
import Table from "../componenets/Table";

function StockPage() {
  const { symbol } = useContext(StockContext);
  const datas = [
    {
      id: 1,
      isBuy: "買進",
      price: 200,
      quantity: 3000,
      date: "2025/12/03",
      fee: 20,
      note: "hello",
    },
  ];
  const config = [
    { label: "#", render: (data) => data.id },
    {
      label: "買進/賣出",
      render: (data) => data.isBuy,
    },
    {
      label: "每股價格",
      render: (data) => data.price,
    },
    {
      label: "購入股數",
      render: (data) => data.quantity,
    },
    {
      label: "交易日期",
      render: (data) => data.date,
    },
    {
      label: "手續費",
      render: (data) => data.fee,
    },
    {
      label: "備註",
      render: (data) => data.note,
    },
  ];
  return (
    <div>
      {symbol}
      <Table config={config} datas={datas} />
    </div>
  );
}

export default StockPage;
