import { TableContainer } from "./Container";
import Table from "./Table";
import Button from "./Button";

function AddDividend({ datas }) {
  const config = [
    {
      label: "配息日",
      render: (data) => data.dividendDate,
    },
    {
      label: "配息金額",
      render: (data) => data.amount.toFixed(3),
    },
    {
      label: "持有股份",
      render: (data) => data.sharesHold,
    },
    {
      label: "正效益",
      render: (data) => data.sharesHold * data.amount,
    },
    {
      label: "",
      render: (data) => (
        <div className="flex gap-1">
          <Button
            text="編輯"
            buttonClass="bg-cyan-600 hover:bg-cyan-400 hover:text-white text-sm px-1.5"
            // onClick={() => {hanldeEdit}}
          />
          <Button
            text="刪除"
            buttonClass="bg-red-700 hover:bg-red-500 hover:text-white text-sm px-1.5"
            // onClick={() => {hanldeDelete}}
          />
        </div>
      ),
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
