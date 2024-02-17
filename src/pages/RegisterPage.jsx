import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import Swal from "sweetalert2";

function RegisterPage({ setPage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      Swal.fire({
        icon: "error",
        title: "輸入密碼不相符",
        timer: 1700,
        showConfirmButton: false,
      });
      return;
    }
    try {
      // 測試用
      // console.log(username, email, password, checkPassword);
      const res = await register({ username, email, password, checkPassword });
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "註冊成功",
          timer: 1700,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1850);
      }
    } catch (err) {
      console.log(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: err.response.data.message,
        timer: 1700,
        showConfirmButton: false,
      });
    }
  };
  return (
    <Container>
      <FormContainer>
        <p className="text-center text-xl font-bold">註冊新帳號</p>
        <p className="text-sm text-center my-3 ">
          已經有帳號了，從這裡
          <a className="text-red-500 font-bold" onClick={() => setPage(true)}>
            登入
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="使用者名稱"
            placeholder="username"
            labelClassName="text-gray-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            label="註冊信箱"
            value={email}
            placeholder="email"
            labelClassName="text-gray-800"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="註冊密碼"
            value={password}
            pattern="^[a-zA-Z0-9]{4,}$"
            placeholder="請輸入4位以上英數字"
            labelClassName="text-gray-800"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            label="再次輸入密碼"
            value={checkPassword}
            pattern="^[a-zA-Z0-9]{4,}$"
            placeholder="請輸入4位以上英數字"
            labelClassName="text-gray-800"
            onChange={(e) => setCheckPassword(e.target.value)}
            required
          />

          <Button
            text="註冊"
            buttonClass="bg-rose-400 hover:bg-rose-500 w-full py-2"
          />
        </form>
      </FormContainer>
    </Container>
  );
}

export default RegisterPage;
