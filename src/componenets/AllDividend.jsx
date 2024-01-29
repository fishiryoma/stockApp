import { Container, TableContainer } from "./Container";
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

  // const renderedStockList = datas.map((item) => (
  //   <li key={item.Stock.symbol}>
  //     <a>
  //       <div>{item.Stock.symbol}</div>
  //       <div className="flex justify-center">{item.Stock.name}</div>
  //     </a>
  //   </li>
  // ));

  return (
    <TableContainer>
      {/* <div className="dropdown dropdown-bottom mb-4">
          <div tabIndex={0} role="button" className="btn m-1">
            選擇股票
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderedStockList}
          </ul>
        </div> */}
      <p className="text-2xl">配息紀錄</p>
      <Table config={config} datas={datas} />
    </TableContainer>
  );
}

export default AddDividend;
