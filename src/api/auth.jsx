import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "";

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
      // localStorage.setItem("authToken", data.data.authToken);
      Cookies.set("token_StockApp", data.data.authToken);
    }
    return data;
  } catch (err) {
    console.log(`Login Failed ${err}`);
  }
};

export const checkPermission = async (authToken) => {
  try {
    // console.log(authToken);
    const res = await axios.get(`${baseUrl}/test-token`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });

    // console.log(res);
    return res.data.success;
  } catch (err) {
    console.log(`Check Permission Failed ${err}`);
  }
};
