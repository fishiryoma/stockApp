import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://b88e-1-170-176-136.ngrok-free.app/api";

export const register = async ({
  username,
  email,
  password,
  checkPassword,
}) => {
  try {
    console.log("testauth");
    console.log(email, password, checkPassword);
    const { data } = await axios.post(`${baseUrl}/register`, {
      username,
      email,
      password,
      checkPassword,
    });
    console.log(data);
    return { ...data };
  } catch (err) {
    console.log(`Register Failed ${err}`);
  }
};

export const login = async ({ email, password }) => {
  try {
    console.log("loginauth");
    const { data } = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    console.log(data);
    if (data.data.authToken) {
      localStorage.setItem("authToken", data.data.authToken);
      Cookies.set("token_StockApp", data.data.authToken);
    }
    return { ...data };
  } catch (err) {
    console.log(`Login Failed ${err}`);
  }
};

export const checkPermission = async (authToken) => {
  try {
    console.log(authToken);
    const res = await axios.get(`${baseUrl}/test-token`, {
      headers: {
        Authorization: "Bearer " + authToken,
        // 網路查到的方法如下
        // "ngrok-skip-browser-warning": "true",

        // Authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6bnVsbCwiZW1haWwiOiIwMDAxQGFhLmFhIiwiY3JlYXRlZEF0IjoiMjAyNC0wMS0xOFQxMTozNTozNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0wMS0xOFQxMTozNTozNS4wMDBaIiwiaWF0IjoxNzA1NjYzODA2LCJleHAiOjE3MDgyNTU4MDZ9.SgVbWMjTqsN6iK1f8U5arcRnEmPYh_Y3Xt44moxyQ2s",
        // "ngrok-skip-browser-warning": "69420",
      },
    });

    console.log(res);
    return res.data.success;
  } catch (err) {
    console.log(`Check Permission Failed ${err}`);
  }
};
