import { Container, FormContainer } from "../componenets/Container";
import AuthInput from "../componenets/Input";
import Button from "../componenets/Button";
import { useState } from "react";

function NewDividendPage() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  return (
    <Container>
      <FormContainer className="bg-transparent ">
        <form className="flex flex-col">
          <AuthInput
            type="number"
            label="個股代碼"
            placeholder="00878"
            value={symbol}
            onChange={(symbol) => setSymbol(symbol)}
            required
          />
          <AuthInput
            type="number"
            label="配息金額"
            placeholder="新台幣"
            value={amount}
            onChange={(amount) => setAmount(amount)}
            min="1"
            required
          />
          <AuthInput
            type="date"
            label="配息發生日"
            placeholder=""
            value={date}
            onChange={(date) => setDate(date)}
            required
          />
          <Button
            text="新增"
            buttonClass="bg-blue-400 hover:bg-blue-500 self-end w-1/3 py-2.5"
          />
        </form>
      </FormContainer>
    </Container>
  );
}

export default NewDividendPage;
