import { useContext } from "react";
import StockContext from "../contexts/StockContext";
import Table from "../componenets/Table";
import { Container, TableContainer } from "../componenets/Container";

function StockPage() {
  const { name } = useContext(StockContext);
  const datas = [
    {
      id: 1,
      isBuy: "t",
      price: 200,
      quantity: 3000,
      date: "2025/12/03",
      fee: 20,
      note: "hello",
    },
    {
      id: 5,
      isBuy: "f",
      price: 20,
      quantity: 300,
      date: "2025/12/03",
      fee: 20,
      note: "hello",
    },
  ];
  const config = [
    { label: "#", render: (data) => data.id },
    {
      label: "買進/賣出",
      render: (data) =>
        data.isBuy === "t" ? (
          <div className="text-red-700">買進</div>
        ) : (
          <div className="text-green-700">賣出</div>
        ),
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
    <Container>
      <p className="text-3xl mb-6">{`${name.symbol} ${name.name}`}</p>
      <TableContainer>
        <Table config={config} datas={datas} />
      </TableContainer>
    </Container>
  );
}

export default StockPage;
