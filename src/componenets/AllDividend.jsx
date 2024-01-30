import { TableContainer } from "./Container";
import Table from "./Table";

function AddDividend() {
  const datas = [
    {
      id: "1",
      Stock: {
        symbol: "00878",
        name: "國泰永續高股息",
      },
      sharesHold: 3000,
      dividendDate: "2023-10-19",
      amount: "2",
    },
    {
      id: "2",
      sharesHold: 3000,
      dividendDate: "2023-02-19",
      amount: "1.2",
    },
  ];
  const config = [
    { label: "#", render: (data) => data.id },

    {
      label: "配息日",
      render: (data) => data.dividendDate,
    },
    {
      label: "配息金額",
      render: (data) => data.amount,
    },
    {
      label: "持有股份",
      render: (data) => data.sharesHold,
    },
    {
      label: "正效益",
      render: (data) => data.sharesHold * data.amount,
    },
  ];

  return (
    <TableContainer tableClass="w-96 sm:w-full lg:w-full 2xl:w-4/5">
      <p className="text-2xl font-bold mb-4">配息紀錄</p>
      <Table config={config} datas={datas} />
    </TableContainer>
  );
}

export default AddDividend;
