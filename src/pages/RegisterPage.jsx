import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
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
    <Container>
      <FormContainer>
        <p className="text-center text-xl font-bold">註冊新帳號</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="使用者名稱"
            placeholder=""
            value={username}
            onChange={(username) => setUsername(username)}
          />
          <Input
            type="email"
            label="註冊信箱*"
            value={email}
            placeholder=""
            onChange={(email) => setEmail(email)}
            required
          />
          <Input
            type="password"
            label="註冊密碼*"
            value={password}
            pattern="^[a-zA-Z0-9]{4,}$"
            placeholder="請輸入4位以上英數字"
            onChange={(password) => setPassword(password)}
            required
          />
          <Input
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
              <Button
                text="登入"
                buttonClass="bg-rose-400 hover:bg-rose-500 py-2"
              />
            </Link>
            <Button text="註冊" buttonClass="bg-blue-400 hover:bg-blue-500" />
          </div>
        </form>
      </FormContainer>
    </Container>
  );
}

export default RegisterPage;
