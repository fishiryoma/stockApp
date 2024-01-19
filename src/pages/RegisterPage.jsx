import { AuthContainer, AuthButton } from "../componenets/AuthContainer";
import AuthInput from "./AuthInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("test");
    console.log(email, password, checkPassword);
    register({ username, email, password, checkPassword });
  }
  return (
    <AuthContainer>
      <p className="text-center font-bold">註冊新帳號</p>
      <form onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          label="使用者名稱"
          placeholder="username"
          value={username}
          onChange={(username) => setUsername(username)}
        />
        <AuthInput
          type="email"
          label="註冊信箱*"
          value={email}
          placeholder="aa@aa.com"
          onChange={(email) => setEmail(email)}
          required
        />
        <AuthInput
          type="password"
          label="註冊密碼*"
          value={password}
          pattern="^[a-zA-Z0-9]{4,}$"
          placeholder="請輸入4位以上英數字"
          onChange={(password) => setPassword(password)}
          required
        />
        <AuthInput
          type="password"
          label="再次輸入密碼*"
          value={checkPassword}
          pattern="^[a-zA-Z0-9]{4,}$"
          placeholder="請輸入4位以上英數字"
          onChange={(password) => setCheckPassword(password)}
          required
        />
        <div className="flex justify-center gap-x-4 mt-6">
          <Link to="/login">
            <AuthButton
              text="登入"
              bgColor="bg-rose-400"
              hover="hover:bg-rose-500"
            />
          </Link>
          <AuthButton text="註冊" />
        </div>
      </form>
    </AuthContainer>
  );
}

export default RegisterPage;
