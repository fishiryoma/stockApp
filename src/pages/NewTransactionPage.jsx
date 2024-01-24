import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import AuthInput from "../componenets/Input";
import Button from "../componenets/Button";
import { Container } from "../componenets/Container";

function NewTransctionPage() {
  //get form data
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [fee, setFee] = useState("");
  const [note, setNote] = useState("");
  const [buy, setBuy] = useState("");

  // Style

  const wrapclass = "my-1";
  const formClass = classNames(
    "w-full md:w-1/3 mx-auto flex flex-col p-8 rounded shadow",
    buy === "t" && "bg-pink-50",
    buy === "f" && "bg-green-50"
  );
  const radioClass =
    "w-1/2 mt-0.5 mx-0.5 py-3 text-white rounded text-center shadow cursor-pointer";
  const buyRadioClass = twMerge(
    classNames(radioClass),
    "bg-red-600 hover:bg-red-500 hover:text-white",
    buy === "t" && "bg-red-700",
    buy === "f" && "bg-transparent text-black"
  );
  const sellRadioClass = twMerge(
    classNames(radioClass),
    "bg-green-600 hover:bg-green-500 hover:text-white",
    buy === "f" && "bg-green-700",
    buy === "t" && "bg-transparent text-black"
  );
  const buttonClass = twMerge(
    "bg-blue-400 hover:bg-blue-500 mt-6 w-1/3 py-2.5 text-white self-end",
    buy === "t" && "bg-red-700 hover:bg-red-500 hover:text-white",
    buy === "f" && "bg-green-700 hover:bg-green-500 hover:text-white"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(symbol, price, quantity, date, fee, note, buy);
  };
  const handleRadioClick = (e) => {
    setBuy(e.target.value);
  };

  return (
    <Container>
      <form className={formClass} onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          label="個股代碼"
          placeholder="00878"
          wrapClassName={wrapclass}
          value={symbol}
          onChange={(symbol) => setSymbol(symbol)}
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
          placeholder="新台幣"
          wrapClassName={wrapclass}
          value={price}
          onChange={(price) => setPrice(price)}
          min="1"
          required
        />
        <AuthInput
          type="number"
          label="購入股數"
          placeholder="1張為1000股"
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
          value={date}
          onChange={(date) => setDate(date)}
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
