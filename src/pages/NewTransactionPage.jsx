import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Input from "../componenets/Input";
import Button from "../componenets/Button";
import { Container } from "../componenets/Container";
import { getNameBySymbol, createTransc } from "../api/stock";
import Swal from "sweetalert2";

function NewTransctionPage() {
  // 先驗證輸入股票代碼是否正確
  const [stock, setStock] = useState("");
  //獲取表格資料
  const [stockId, setStockId] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [isBuy, setisBuy] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [transDate, setTransDate] = useState("");
  const [fee, setFee] = useState("");
  const [note, setNote] = useState("");

  // Style
  const wrapclass = "my-1";
  const formClass = twMerge(
    classNames(
      "w-full md:w-2/3 lg:w-3/5 xl:w-1/3 mx-auto flex flex-col p-8 rounded shadow bg-gray-700",
      isBuy === true && "bg-red-900/85",
      isBuy === false && "bg-green-900/85"
    )
  );
  const radioClass =
    "w-1/2 mt-0.5 mx-0.5 py-3 text-white rounded text-center shadow cursor-pointer";
  const buyRadioClass = twMerge(
    classNames(radioClass),
    "bg-red-600 hover:bg-red-500 hover:text-white",
    isBuy === true && "bg-red-700",
    isBuy === false && "bg-transparent text-black"
  );
  const sellRadioClass = twMerge(
    classNames(radioClass),
    "bg-green-600 hover:bg-green-500 hover:text-white",
    isBuy === false && "bg-green-700",
    isBuy === true && "bg-transparent text-black"
  );
  const buttonClass = twMerge(
    "border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 mt-6 w-1/3 py-2.5 text-white self-end",
    isBuy === true && "bg-red-700 hover:bg-red-500 hover:text-white border-0",
    isBuy === false &&
      "bg-green-700 hover:bg-green-500 hover:text-white border-0"
  );
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 測試用
    // console.log({
    //   stockId: stock.id,
    //   pricePerUnit: +pricePerUnit,
    //   quantity: +quantity,
    //   transDate,
    //   fee: +fee,
    //   note,
    //   isBuy,
    // });

    try {
      const res = await createTransc({
        stockId: stock.id,
        pricePerUnit: +pricePerUnit,
        quantity: +quantity,
        transDate,
        fee: +fee,
        note,
        isBuy,
      });
      console.log(res);
      if (res.success && isBuy) {
        Toast.fire({
          icon: "success",
          title: "新增一筆買進成功",
        });
      }
      if (res.success && !isBuy) {
        Toast.fire({
          icon: "info",
          title: "新增一筆賣出成功",
        });
      }
      const cleanData = () => {
        setStock("");
        setStockId("");
        setCheckBox(false);
        setPricePerUnit("");
        setQuantity("");
        setTransDate("");
        setFee("");
        setNote("");
        setisBuy("");
      };
      cleanData();
    } catch (err) {
      console.log(`Create Transaction Failed ${err}`);
    }
  };
  const handleSymbolCheck = async () => {
    try {
      const res = await getNameBySymbol(stockId);
      if (res.success) {
        setStock(res.data.stock);
        console.log(res.data.stock);
      }
    } catch (err) {
      Swal.fire({
        title: "找不到這隻股票",
        icon: "error",
        timer: 1700,
        showConfirmButton: false,
      });
      console.log(`Get Stock Name Failed ${err}`);
    }
  };

  return (
    <Container className="bg-gray-800">
      <form className={formClass} onSubmit={handleSubmit}>
        <div className="text-white text-2xl font-bold text-center">
          {stock ? stock.name : <p>請輸入有效股票代碼</p>}
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            label="個股代碼"
            placeholder="請按enter或確認"
            wrapClassName="my-1 w-11/12"
            value={stockId}
            onChange={(e) => {
              setStockId(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSymbolCheck();
            }}
            required
          />
          <div
            className="btn btn-warning btn-xs mt-7"
            onClick={() => handleSymbolCheck()}
          >
            確認
          </div>
        </div>
        <div className="flex">
          <label htmlFor="in" className={buyRadioClass}>
            <input
              className="appearance-none"
              type="radio"
              name="options"
              id="in"
              value="true"
              onClick={() => setisBuy(true)}
              required
            ></input>
            買進
          </label>
          <label htmlFor="out" className={sellRadioClass}>
            <input
              className="appearance-none"
              type="radio"
              name="options"
              id="out"
              value="false"
              onClick={() => setisBuy(false)}
              required
            ></input>
            賣出
          </label>
        </div>
        <div className="flex items-center justify-between">
          {checkBox ? (
            <Input
              type="number"
              label="每股價格"
              placeholder="0元"
              wrapClassName="my-1 w-8/12"
              inputClassName="bg-gray-300 placeholder:text-slate-500"
              disabled
            />
          ) : (
            <Input
              type="number"
              label="每股價格"
              placeholder=""
              wrapClassName="my-1 w-8/12"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              min="1"
              required
            />
          )}

          <div className="mt-6">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-warning border-2 mr-3"
                onChange={(e) => {
                  setCheckBox(e.target.checked);
                  if (e.target.checked) {
                    setNote("配股、增資、減資");
                    setPricePerUnit(0);
                    setFee(0);
                  }
                  if (!e.target.checked) setNote("");
                }}
              />
              <span className="label-text text-gray-200">配股、增資、減資</span>
            </label>
          </div>
        </div>
        <Input
          type="number"
          label="購入股數"
          placeholder="每張1000股"
          wrapClassName={wrapclass}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
        <Input
          type="date"
          label="交易日期"
          placeholder=""
          wrapClassName={wrapclass}
          value={transDate}
          onChange={(e) => setTransDate(e.target.value)}
          required
        />
        {checkBox ? (
          <Input
            type="number"
            label="手續費"
            placeholder="手續費0元"
            wrapClassName={wrapclass}
            inputClassName="bg-gray-300 placeholder:text-slate-500"
            disabled
          />
        ) : (
          <Input
            type="number"
            label="手續費"
            placeholder="新台幣"
            wrapClassName={wrapclass}
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            min="1"
            required
          />
        )}
        <Input
          type="text"
          label="備註"
          placeholder=""
          wrapClassName={wrapclass}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {stock ? (
          <Button
            text="新增"
            buttonClass={buttonClass}
            onClick={() => {
              if (isBuy === "") {
                Swal.fire({
                  title: "請選擇買進或賣出",
                  icon: "error",
                  timer: 1700,
                  showConfirmButton: false,
                });
                return;
              }
            }}
          />
        ) : (
          <Button text="請確認股票代號" buttonClass={buttonClass} disabled />
        )}
      </form>
    </Container>
  );
}

export default NewTransctionPage;
