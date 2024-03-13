import { useState, useEffect } from "react";
import { Container, FormContainer } from "../componenets/Container";
import Input from "../componenets/Input";
import Button from "../componenets/Button";
import { getNameBySymbol, createDividend } from "../api/stock";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { popupMsg, pupupMsgSmall } from "../componenets/Helper";

export default function NewDividendPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <Container className="bg-gray-800">
      <FormContainer className="bg-gray-700 ">
        <DividendForm />
      </FormContainer>
    </Container>
  );
}

function DividendForm() {
  // 先驗證輸入股票代碼是否正確
  const [stock, setStock] = useState("");
  const [stockId, setStockId] = useState("");
  const [amount, setAmount] = useState("");
  const [dividendDate, setDividendDate] = useState("");

  const handleSymbolCheck = async () => {
    try {
      const res = await getNameBySymbol(stockId);
      if (res.success) {
        setStock(res.data.stock);
      }
    } catch (err) {
      popupMsg("找不到這隻股票");
      console.error(err);
    }
  };

  const cleanData = () => {
    setStock("");
    setStockId("");
    setDividendDate("");
    setAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createDividend({
        dividendDate,
        amount: +amount,
        stockId: stock.id,
      });
      if (res.success) {
        pupupMsgSmall("新增一筆股利成功");
      }
      cleanData();
    } catch (err) {
      popupMsg("新增失敗，請再次確認");
      console.error(err);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="text-white text-2xl font-bold text-center">
        {stock ? stock.name : <p>請輸入有效股票代碼</p>}
      </div>
      <div className="flex items-center gap-4">
        <Input
          type="number"
          label="個股代碼"
          placeholder="ex: 00878"
          value={stockId}
          onChange={(e) => {
            setStockId(e.target.value);
          }}
          required
          wrapClassName="w-11/12"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSymbolCheck();
            }
          }}
        />
        <div
          className="btn btn-warning btn-xs mt-7"
          onClick={() => handleSymbolCheck()}
        >
          確認
        </div>
      </div>
      <Input
        type="number"
        label="每股配息金額"
        placeholder="新台幣"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <Input
        type="date"
        label="配息日期"
        placeholder=""
        value={dividendDate}
        onChange={(e) => setDividendDate(e.target.value)}
        required
      />
      <Button
        text="新增"
        buttonClass="border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 self-end w-full max-w-xs py-2.5 mt-4"
        disabled={stock ? false : true}
      />
    </form>
  );
}
