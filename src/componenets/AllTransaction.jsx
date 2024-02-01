import { Container, TableContainer } from "./Container";
import Table from "./Table";
import Button from "./Button";
import { deleteTranscById } from "../api/stock";

function AllTransaction({ datas }) {
  // const hanldeDelete = async(id)=>{
  //   try {
  //     const res = await deleteTranscById();
  //     if (res) console.log("ok");
  //   } catch (err) {
  //     console.log(`Delete Transaction Failed ${err}`);
  //   }
  // }

  const config = [
    {
      label: "交易日",
      render: (data) => data.transDate,
    },
    {
      label: "成交",
      render: (data) =>
        data.isBuy ? (
          <div className="text-red-500">買進</div>
        ) : (
          <div className="text-green-500">賣出</div>
        ),
    },
    {
      label: "交易量",
      render: (data) => data.quantity,
    },
    {
      label: "每股價格",
      render: (data) => data.pricePerUnit.toFixed(2),
    },
    {
      label: "手續費",
      render: (data) => data.fee,
    },
    {
      label: "備註",
      render: (data) => data.note,
    },
    {
      label: "",
      render: (data) => (
        <Button
          text="刪除"
          buttonClass="bg-red-700 hover:bg-red-500 hover:text-white text-sm px-1.5"
          // onClick={() => {hanldeDelete}}
        />
      ),
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
