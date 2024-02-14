import { useState, useEffect } from "react";
import { Container, FormContainer } from "../componenets/Container";
import Input from "../componenets/Input";
import Button from "../componenets/Button";
import { getNameBySymbol, createDividend } from "../api/stock";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function NewDividendPage() {
  // 先驗證輸入股票代碼是否正確
  const [stock, setStock] = useState("");
  const [stockId, setStockId] = useState("");
  const [amount, setAmount] = useState("");
  const [dividendDate, setDividendDate] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
    try {
      const res = await createDividend({
        dividendDate,
        amount: +amount,
        stockId: stock.id,
      });
      console.log(res);
      if (res.success) {
        Toast.fire({
          icon: "success",
          title: "新增一筆股利成功",
        });
      }
      const cleanData = () => {
        setStock("");
        setStockId("");
        setDividendDate("");
        setAmount("");
      };
      cleanData();
    } catch (err) {
      console.log(`Create Dividend Failed ${err}`);
      Swal.fire({
        title: "新增失敗，請再次確認",
        icon: "error",
        timer: 1700,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Container className="bg-gray-800">
      <FormContainer className="bg-gray-700 md:w-3/5 lg:w-2/5 xl:w-1/4">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="text-white text-2xl font-bold text-center">
            {stock ? stock.name : <p>請輸入有效股票代碼</p>}
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              label="個股代碼"
              placeholder="00878"
              value={stockId}
              onChange={(e) => {
                setStockId(e.target.value);
              }}
              required
              wrapClassName="w-11/12"
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
            min="1"
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

          {stock ? (
            <Button
              text="新增"
              buttonClass="border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 self-end w-1/3 py-2.5 mt-4"
            />
          ) : (
            <Button
              text="請確認股票代號"
              buttonClass="border-solid border border-gray-200 hover:bg-gray-200 hover:text-gray-800 self-end  py-2.5 mt-4"
              disabled
            />
          )}
        </form>
      </FormContainer>
    </Container>
  );
}

export default NewDividendPage;
