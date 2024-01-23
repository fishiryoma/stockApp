import classNames from "classnames";
import { useState } from "react";
import AuthInput from "./Input";
import { Button } from "../componenets/Button";

function NewTransctionPage() {
  //get form data
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [fee, setFee] = useState("");
  const [note, setNote] = useState("");

  // Style
  const inputclass = "text-base";
  const labelclass = "text-base";
  const wrapclass = "my-1";
  const formClass = classNames("w-96 ml-20 flex flex-col");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(symbol, price, quantity, date, fee, note);
  };

  return (
    <div>
      <form className={formClass} onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          label="個股代碼"
          placeholder="00878"
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={symbol}
          onChange={(symbol) => setSymbol(symbol)}
        />
        <div className="flex">
          <label>
            買進
            <input type="radio"></input>
          </label>
          <label>
            賣出
            <input type="radio"></input>
          </label>
        </div>
        <AuthInput
          type="number"
          label="每股價格"
          placeholder=""
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={price}
          onChange={(price) => setPrice(price)}
        />
        <AuthInput
          type="number"
          label="購入股數"
          placeholder=""
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={quantity}
          onChange={(quantity) => setQuantity(quantity)}
        />
        <AuthInput
          type="date"
          label="交易日期"
          placeholder=""
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <AuthInput
          type="number"
          label="手續費"
          placeholder=""
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={fee}
          onChange={(fee) => setFee(fee)}
        />
        <AuthInput
          type="text"
          label="備註"
          placeholder=""
          inputClassName={inputclass}
          labelClassName={labelclass}
          wrapClassName={wrapclass}
          value={note}
          onChange={(note) => setNote(note)}
        />
        <Button text="新增" buttonClass="mt-6 w-1/3 py-2 text-base self-end" />
      </form>
    </div>
  );
}

export default NewTransctionPage;
