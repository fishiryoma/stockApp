import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { popupMsg } from "../componenets/Helper";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (isAuthenticated) {
      navigate("/mypage");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Container className="mt-0 landing h-screen">
      <FormContainer>
        <p className="text-center text-xl font-bold">註冊新帳號</p>
        <p className="text-center my-3 ">
          已經有帳號了，從這裡
          <Link to="/login">
            <span className="text-red-500 font-bold">登入</span>
          </Link>
        </p>
        <RegisterForm />
        {/* <hr className="my-5"></hr>
        <Link to="http://localhost:3000/api/login/facebook">
          <Button
            text="Facebook"
            buttonClass="bg-blue-400 hover:bg-blue-500 w-full py-2"
          />
        </Link> */}
      </FormContainer>
    </Container>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      popupMsg("輸入密碼不相符");
      return;
    }
    try {
      // 測試用
      // console.log(username, email, password, checkPassword);
      const res = await register({
        username,
        email,
        password,
        checkPassword,
      });
      if (res.success) {
        popupMsg("註冊成功", "", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1850);
      }
    } catch (err) {
      popupMsg("註冊失敗", err.response.data.message);
      console.error(err);
    }
  };

  return (
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
  );
}
