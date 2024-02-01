import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, checkPermission } from "../api/auth";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/sum");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("testlogin");
    try {
      const { data } = await login({ email, password });
      if (data.success) console.log("success");
    } catch (err) {
      console.log(`Login Failed ${err}`);
    }
  };

  return (
    <Container className="bg-white">
      <FormContainer className="md:w-2/3 lg:w-2/5 xl:w-1/4">
        <p className="text-xl text-center font-bold">登入</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="使用者信箱"
            value={email}
            placeholder=""
            labelClassName="text-gray-800"
            onChange={(email) => setEmail(email)}
            required
          />
          <Input
            type="password"
            label="密碼"
            value={password}
            placeholder=""
            labelClassName="text-gray-800"
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
            <Button text="登入" buttonClass="bg-blue-400 hover:bg-blue-500" />
          </div>
        </form>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
