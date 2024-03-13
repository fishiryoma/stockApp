import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_APP_API_URL;

const stockAPI = axios.create({
  baseURL: baseUrl,
  timeout: 3500,
});
stockAPI.interceptors.request.use(
  (config) => {
    // get Token
    const token = Cookies.get("token_StockApp");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.error(err);
  }
);

export const register = async ({
  username,
  email,
  password,
  checkPassword,
}) => {
  try {
    console.log(email, password, checkPassword);
    const { data } = await stockAPI.post("/api/register", {
      username,
      email,
      password,
      checkPassword,
    });
    // console.log(data);
    return data;
  } catch (err) {
    throw new Error(`註冊失敗${err.message}`);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await stockAPI.post("/api/login", {
      email,
      password,
    });
    // console.log(data);
    if (data.data.authToken) {
      Cookies.set("token_StockApp", data.data.authToken);
    }
    return data;
  } catch (err) {
    throw new Error(`登入失敗${err.message}`);
  }
};

export const checkPermission = async () => {
  try {
    const res = await stockAPI.get("/api/test-token");
    // console.log(res);
    return res.data.success;
  } catch (err) {
    throw new Error(`認證Permission失敗${err.message}`);
  }
};
