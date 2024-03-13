import { TableContainer } from "../Container";
import Table from "../Table";
import Button from "../Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { editDividendById, deleteDividendById } from "../../api/stock";
import Pagination from "../Pagination";
import { useStock } from "../../hooks/useStock";
import { popupMsg, ensurePopup } from "../Helper";
import Swal from "sweetalert2";

export default function AddDividend({
  allDividend,
  dividendPage,
  setDividendPage,
  updateAllDate,
}) {
  const { stockShowing } = useStock();

  const handleDividendDelete = async (id) => {
    try {
      const result = await ensurePopup("確定要刪除這筆交易嗎");
      if (result.isConfirmed) {
        popupMsg("已刪除交易", "", "success");
        const res = await deleteDividendById(id);
        if (res) {
          updateAllDate();
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const handleDividendEdit = async ({ id, dividendDate, amount, stockId }) => {
    // 測試用
    // console.log({ id, amount, dividendDate, stockId });
    try {
      const result = await ensurePopup("確定要修改這筆交易嗎");
      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: "請修改資料",
          html: `<div class="flex items-center mb-5"><label for="date">配息日</label>
    <input id="date" class="swal2-input flex-grow my-0 mx-3" type="date" value=${dividendDate}></div>
    <div class="flex items-center"><label for="amount">配息金額</label>
    <input id="amount" class="swal2-input flex-grow my-0 mx-3" type="number" value=${amount}></div>
  `,
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("date").value,
              document.getElementById("amount").value,
            ];
          },
        });
        if (formValues) {
          const res = await editDividendById({
            id,
            dividendDate: formValues[0],
            amount: +formValues[1],
            stockId,
          });

          if (res.success) {
            updateAllDate();
            popupMsg("已修改完成", "", "success");
          }
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const config = [
    {
      label: "配息日",
      render: (data) => (
        <div className="text-xs xl:text-base">{data.dividendDate}</div>
      ),
    },
    {
      label: "配息金額(元)",
      render: (data) => data.amount.toFixed(2),
    },
    {
      label: "持有股份(股)",
      render: (data) => data.sharesHold,
    },
    {
      label: "收益(元)",
      render: (data) => (data.sharesHold * data.amount).toLocaleString("zh-tw"),
    },
    {
      label: "",
      render: (data) => (
        <div className="flex gap-1">
          <Button
            text={<TiPencil />}
            buttonClass="bg-cyan-600 hover:bg-cyan-400 hover:text-white text-sm px-0.5"
            onClick={() => {
              handleDividendEdit({
                id: data.id,
                amount: data.amount,
                dividendDate: data.dividendDate,
                stockId: stockShowing.id,
              });
            }}
          />
          <Button
            text={<RiDeleteBinLine />}
            buttonClass="bg-red-700 hover:bg-red-500 hover:text-white text-sm px-0.5"
            onClick={() => handleDividendDelete(data.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <TableContainer tableClass="border-2 p-3 rounded-lg lg:w-[460px]">
      <p className="text-2xl font-bold mb-4">配息紀錄</p>
      {allDividend.length ? (
        <Table config={config} datas={allDividend} />
      ) : (
        <div className="text-xl">目前沒有更多紀錄</div>
      )}
      <Pagination
        page={dividendPage}
        setPage={setDividendPage}
        datas={allDividend}
      />
    </TableContainer>
  );
}
