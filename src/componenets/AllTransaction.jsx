import { Container, TableContainer } from "./Container";
import Table from "./Table";

function AllTransaction() {
  const datas = [
    {
      id: 5,
      transDate: "2023-03-01",
      quantity: 1000,
      pricePerUnit: 16.9,
      fee: 20,
      note: "定期定額",
      userId: 1,
      stockId: 1,
    },
    {
      id: 6,
      transDate: "2023-03-01",
      quantity: 1000,
      pricePerUnit: 16.9,
      fee: 20,
      note: "定期定額",
      userId: 1,
      stockId: 1,
    },
    {
      id: 7,
      transDate: "2023-03-01",
      quantity: 1000,
      pricePerUnit: 16.9,
      fee: 20,
      note: "定期定額",
      userId: 1,
      stockId: 1,
    },
  ];
  const config = [
    {
      label: "交易日",
      render: (data) => data.transDate,
    },
    {
      label: "交易量",
      render: (data) => data.quantity,
    },
    {
      label: "每股價格",
      render: (data) => data.pricePerUnit,
    },
    {
      label: "備註",
      render: (data) => data.note,
    },
  ];

  return (
    <TableContainer tableClass="w-96 sm:w-full lg:w-full 2xl:w-4/5">
      <p className="text-2xl font-bold mb-4">交易紀錄</p>
      <Table config={config} datas={datas} />
    </TableContainer>
  );
}

export default AllTransaction;
