import { AuthContainer } from "../componenets/AuthContainer";
import { Button } from "../componenets/Button";
import Input from "./Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login, checkPermission } from "../api/auth";
import Cookies from "js-cookie";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("testlogin");
    login({ email, password });
  }
  function handleClick() {
    // console.log(localStorage.getItem("authToken"));
    // const token = localStorage.getItem("authToken");
    // checkPermission(token);
    // Cookies.set("testCookie", "ccc");
    // console.log(Cookies.get("testCookie"));
    const cookie = Cookies.get("token_StockApp");
    checkPermission(cookie);
    // checkPermission(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwib…wNTd9.OFyHf32HabGNX67H_GCxOSZ0gDYNXvZq9Wx1Yfu29Kg"
    // );
  }

  return (
    <AuthContainer>
      <p className="text-center font-bold">登入</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="使用者信箱"
          value={email}
          placeholder=""
          onChange={(email) => setEmail(email)}
          required
        />
        <Input
          type="password"
          label="密碼"
          value={password}
          placeholder=""
          onChange={(password) => setPassword(password)}
          required
        />
        <div className="flex justify-center gap-x-4 mt-6">
          <Link to="/register">
            <Button
              text="註冊"
              buttonClass="bg-rose-400 hover:bg-rose-500 py-2"
            />
          </Link>
          <Button text="登入" />
        </div>
      </form>
      <button onClick={handleClick}>CHECK</button>
    </AuthContainer>
  );
}

export default LoginPage;
