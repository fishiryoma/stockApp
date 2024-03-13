import { Container, FormContainer } from "../componenets/Container";
import Button from "../componenets/Button";
import Input from "../componenets/Input";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { popupMsg } from "../componenets/Helper";

export default function LoginPage() {
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
        <p className="text-xl text-center font-bold">登入</p>
        <p className="text-center my-3 ">
          還沒有
          <Link to="/register">
            <span className="text-blue-700 font-bold">申請帳號</span>
          </Link>
          帳號嗎？
        </p>
        <LoginForm />
      </FormContainer>
    </Container>
  );
}

function LoginForm() {
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
        setUser({ ...user, name: res.data.username, icon: 1 });
        popupMsg("登入成功", "", "success");
        setTimeout(() => {
          navigate("/mypage");
          setIsAuthenticated(true);
        }, 1800);
      }
    } catch (err) {
      popupMsg("登入失敗", "請再次確認帳號與密碼");
      console.error(err);
    }
  };

  return (
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
  );
}
