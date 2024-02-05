import { TableContainer } from "./Container";
import Table from "./Table";
import Button from "./Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteTranscById } from "../api/stock";
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import { useEffect } from "react";

function AllTransaction({
  getAllTransaction,
  allTransc,
  transcPage,
  setTranscPage,
}) {
  useEffect(() => {
    getAllTransaction();
  }, [transcPage]);

  const handleTranscDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "確定要刪除這筆交易嗎?",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      });
      if (result.isConfirmed) {
        await Swal.fire("已刪除交易", "", "success");
        const res = await deleteTranscById(id);
        if (res) {
          getAllTransaction();
        }
      }
    } catch (err) {
      console.log(`Delete Transaction Failed ${err}`);
    }
  };

  const config = [
    {
      label: "交易日",
      render: (data) => (
        <div className="text-xs xl:text-base">{data.transDate}</div>
      ),
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
      label: "交易量(股)",
      render: (data) => data.quantity,
    },
    {
      label: "每股價格(元)",
      render: (data) => data.pricePerUnit.toFixed(0),
    },
    {
      label: "手續費(元)",
      render: (data) => data.fee,
    },
    {
      label: "備註",
      render: (data) => <div className="text-xs">{data.note}</div>,
    },
    {
      label: "",
      render: (data) => (
        <Button
          text={<RiDeleteBinLine />}
          buttonClass="bg-red-700 hover:bg-red-500 hover:text-white text-sm px-0.5"
          onClick={() => {
            handleTranscDelete(data.id);
          }}
        />
      ),
    },
  ];

  return (
    <TableContainer tableClass="lg:w-full border-2 p-3 rounded-lg">
      <p className="text-2xl font-bold mb-4">交易紀錄</p>
      {allTransc.length ? (
        <Table config={config} datas={allTransc} />
      ) : (
        <div className="text-xl">目前沒有更多紀錄</div>
      )}
      <Pagination page={transcPage} setPage={setTranscPage} datas={allTransc} />
    </TableContainer>
  );
}

export default AllTransaction;
