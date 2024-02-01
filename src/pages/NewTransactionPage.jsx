import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import AuthInput from "../componenets/Input";
import Button from "../componenets/Button";
import { Container } from "../componenets/Container";

function NewTransctionPage() {
  // 先驗證輸入股票代碼是否正確
  const [stockName, setStockName] = useState("");
  const [checkStockName, setCheckStockName] = useState(true);
  //獲取表格資料
  const [stockId, setStockId] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [transDate, setTransDate] = useState("");
  const [fee, setFee] = useState("");
  const [note, setNote] = useState("");
  const [isbuy, setIsBuy] = useState("");

  // Style
  const wrapclass = "my-1";
  const formClass = twMerge(
    classNames(
      "w-full md:w-2/3 lg:w-3/5 xl:w-1/3 mx-auto flex flex-col p-8 rounded shadow bg-gray-700",
      isbuy === "t" && "bg-red-900/85",
      isbuy === "f" && "bg-green-900/85"
    )
  );
  const radioClass =
    "w-1/2 mt-0.5 mx-0.5 py-3 text-white rounded text-center shadow cursor-pointer";
  const buyRadioClass = twMerge(
    classNames(radioClass),
    "bg-red-600 hover:bg-red-500 hover:text-white",
    isbuy === "t" && "bg-red-700",
    isbuy === "f" && "bg-transparent text-black"
  );
  const sellRadioClass = twMerge(
    classNames(radioClass),
    "bg-green-600 hover:bg-green-500 hover:text-white",
    isbuy === "f" && "bg-green-700",
    isbuy === "t" && "bg-transparent text-black"
  );
  const buttonClass = twMerge(
    "border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 mt-6 w-1/3 py-2.5 text-white self-end",
    isbuy === "t" && "bg-red-700 hover:bg-red-500 hover:text-white border-0",
    isbuy === "f" && "bg-green-700 hover:bg-green-500 hover:text-white border-0"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(symbol, price, quantity, date, fee, note, buy);
  };
  const handleRadioClick = (e) => {
    setIsBuy(e.target.value);
  };

  return (
    <Container className="bg-gray-800">
      <form className={formClass} onSubmit={handleSubmit}>
        <div className="text-white text-lg font-bold text-center">
          {checkStockName ? (
            stockName
          ) : (
            <span className="loading loading-spinner text-accent"></span>
          )}
        </div>
        <AuthInput
          type="number"
          label="個股代碼"
          placeholder="00878"
          wrapClassName={wrapclass}
          value={stockId}
          onChange={(stockId) => {
            setCheckStockName(false);
            // setStockId(stockId);
          }}
          required
        />
        <div className="flex">
          <label htmlFor="in" className={buyRadioClass}>
            <input
              className="appearance-none"
              type="radio"
              name="options"
              id="in"
              value="t"
              onClick={handleRadioClick}
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
              value="f"
              onClick={handleRadioClick}
              required
            ></input>
            賣出
          </label>
        </div>
        <AuthInput
          type="number"
          label="每股價格"
          placeholder=""
          wrapClassName={wrapclass}
          value={pricePerUnit}
          onChange={(pricePerUnit) => setPricePerUnit(pricePerUnit)}
          min="1"
          required
        />
        <AuthInput
          type="number"
          label="購入股數"
          placeholder="每張1000股"
          wrapClassName={wrapclass}
          value={quantity}
          onChange={(quantity) => setQuantity(quantity)}
          min="1"
          required
        />
        <AuthInput
          type="date"
          label="交易日期"
          placeholder=""
          wrapClassName={wrapclass}
          value={transDate}
          onChange={(transDate) => setTransDate(transDate)}
          required
        />
        <AuthInput
          type="number"
          label="手續費"
          placeholder="新台幣"
          wrapClassName={wrapclass}
          value={fee}
          onChange={(fee) => setFee(fee)}
          min="1"
          required
        />
        <AuthInput
          type="text"
          label="備註"
          placeholder=""
          wrapClassName={wrapclass}
          value={note}
          onChange={(note) => setNote(note)}
        />
        <Button text="新增" buttonClass={buttonClass} />
      </form>
    </Container>
  );
}

export default NewTransctionPage;
