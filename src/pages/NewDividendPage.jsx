import { Container, FormContainer } from "../componenets/Container";
import AuthInput from "../componenets/Input";
import Button from "../componenets/Button";
import { useState } from "react";

function NewDividendPage() {
  const [stockId, setStockId] = useState("");
  const [amount, setAmount] = useState("");
  const [dividendDate, setDividendDate] = useState("");

  return (
    <Container className="bg-gray-800">
      <FormContainer className="bg-gray-700 md:w-3/5 lg:w-2/5 xl:w-1/4">
        <form className="flex flex-col">
          <AuthInput
            type="number"
            label="個股代碼"
            placeholder="00878"
            value={stockId}
            onChange={(stockId) => setStockId(stockId)}
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
            label="配息日期"
            placeholder=""
            value={dividendDate}
            onChange={(dividendDate) => setDividendDate(dividendDate)}
            required
          />
          <Button
            text="新增"
            buttonClass="border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 self-end w-1/3 py-2.5 mt-4"
          />
        </form>
      </FormContainer>
    </Container>
  );
}

export default NewDividendPage;
