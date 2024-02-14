import { TableContainer } from "./Container";
import Table from "./Table";
import Button from "./Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { editDividendById, deleteDividendById } from "../api/stock";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Pagination from "./Pagination";
import { useStock } from "../hooks/useStock";

function AddDividend({
  allDividend,
  dividendPage,
  setDividendPage,
  getAllDividend,
}) {
  const { stockBtn } = useStock();

  useEffect(() => {
    getAllDividend();
  }, [dividendPage]);

  const handleDividendDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "確定要刪除這筆交易嗎?",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      });
      if (result.isConfirmed) {
        Swal.fire("已刪除交易", "", "success");
        const res = await deleteDividendById(id);
        if (res) {
          getAllDividend();
        }
      }
    } catch (err) {
      console.log(`Delete Transaction Failed ${err}`);
    }
  };

  const handleDividendEdit = async ({ id, dividendDate, amount, stockId }) => {
    // 測試用
    // console.log({ id, amount, dividendDate, stockId });
    try {
      const result = await Swal.fire({
        title: "要修改這筆交易嗎?",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      });
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
            getAllDividend();
            Swal.fire("已修改完成", "", "success");
          }
        }
      }
    } catch (err) {
      console.log(`Delete Transaction Failed ${err}`);
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
      render: (data) => data.amount.toFixed(0),
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
                stockId: stockBtn.id,
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
    <TableContainer tableClass="lg:w-full border-2 p-3 rounded-lg">
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

export default AddDividend;
