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
    console.error(`Register Failed ${err}`);
    throw err;
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
    console.error(`Login Failed ${err}`);
    throw err;
  }
};

export const checkPermission = async () => {
  try {
    const res = await stockAPI.get("/api/test-token");
    // console.log(res);
    return res.data.success;
  } catch (err) {
    console.error(`Check Permission Failed ${err}`);
  }
};
