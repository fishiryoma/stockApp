import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

function LoginPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      // console.log(res);
      if (res.success) {
        setIsAuthenticated(true);
        setUser({ ...user, name: res.data.username, icon: 1 });
        Swal.fire({
          icon: "success",
          title: "登入成功",
          timer: 1700,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/sum");
        }, 1850);
      }
    } catch (err) {
      console.error(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: err.response.data.message,
        timer: 1700,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <p className="text-xl text-center font-bold">登入</p>
        <p className="text-sm text-center my-3 ">
          還沒有
          <a className="text-blue-700 font-bold" onClick={() => setPage(false)}>
            申請帳號
          </a>
          帳號嗎？
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="使用者信箱"
            value={email}
            placeholder=""
            labelClassName="text-gray-800"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="密碼"
            value={password}
            placeholder="請輸入4位以上英數字"
            pattern="^[a-zA-Z0-9]{4,}$"
            labelClassName="text-gray-800"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            text="登入"
            buttonClass="bg-blue-400 hover:bg-blue-500 w-full py-2"
          />
        </form>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
