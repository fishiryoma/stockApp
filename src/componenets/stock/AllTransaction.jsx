import { TableContainer } from "../Container";
import Table from "../Table";
import Button from "../Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteTranscById } from "../../api/stock";
import Pagination from "../Pagination";
import { popupMsg, ensurePopup } from "../Helper";

export default function AllTransaction({
  allTransc,
  transcPage,
  setTranscPage,
  updateAllDate,
}) {
  const handleTranscDelete = async (id) => {
    try {
      const result = await ensurePopup("確定要刪除這筆交易嗎");
      if (result.isConfirmed) {
        popupMsg("已刪除交易", "", "success");
        const res = await deleteTranscById(id);
        if (res) {
          await updateAllDate();
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
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
    <TableContainer tableClass="border-2 p-3 rounded-lg lg:w-[460px]">
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
