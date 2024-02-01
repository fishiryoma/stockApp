import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "";
// const authorization = {
//   headers: {
//     Authorization: "Bearer Token",
//   },
// };

const stockAPI = axios.create({
  baseURL: baseUrl,
});
stockAPI.interceptors.request.use(
  (config) => {
    // get Token
    // Cookies.set("token_StockApp", data.data.authToken);
    const token = Cookies.get("token_StockApp");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

// 驗證股票代碼是否正確
export const getNameBySymbol = async ({ symbol }) => {
  try {
    const { data } = await stockAPI.post(`/api/${symbol}`, {
      symbol,
    });
    // data.success判斷輸入股票代碼是否正確
    return data;
  } catch (err) {
    console.log(`Get Stock Name Failed ${err}`);
  }
};

// 依股票ID獲取資料
export const getAbstractByStockId = async (stockId) => {
  try {
    const { data } = await stockAPI.get(`/api/stocks/${stockId}/abstract`, {
      stockId,
    });
    // data.success判斷庫存是否有這支股票
    return data;
  } catch (err) {
    console.log(`Get Stock Info Failed ${err}`);
  }
};

export const getTransactionByStockId = async (stockId, page) => {
  try {
    const { data } = await stockAPI.get(`/api/stocks/${stockId}/transactions`, {
      stockId,
      page,
    });
    // 拿到所有交易紀錄
    return data.data.transactions;
  } catch (err) {
    console.log(`Get Stock Info Failed ${err}`);
  }
};

export const getDividendByStockId = async (stockId, page) => {
  try {
    const { data } = await stockAPI.get(`/api/stocks/${stockId}/dividends`, {
      stockId,
      page,
    });
    // 拿到所有配息紀錄
    return data.data.dividends;
  } catch (err) {
    console.log(`Get Stock Info Failed ${err}`);
  }
};

// 新增、刪除交易紀錄
export const createTransc = async ({
  transDate,
  isBuy,
  quantity,
  pricePerUnit,
  fee,
  note,
  stockId,
}) => {
  try {
    const { data } = await stockAPI.post(`/api/transactions`, {
      transDate,
      isBuy,
      quantity,
      pricePerUnit,
      fee,
      note,
      stockId,
    });
    return data;
  } catch (err) {
    console.log(`Create Transaction Failed ${err}`);
  }
};

export const getTranscById = async (id) => {
  try {
    const { data } = await stockAPI.get(`/api/transactions/${id}`, {
      id,
    });
    return data;
  } catch (err) {
    console.log(`Get Transaction Failed ${err}`);
  }
};

export const deleteTranscById = async (id) => {
  try {
    const { data } = await stockAPI.delete(`/api/transactions/${id}`, {
      id,
    });
    return data.success;
  } catch (err) {
    console.log(`Delete Transaction Failed ${err}`);
  }
};

// 新增、刪除修改股利
export const createDividend = async ({ dividendDate, amount, stockId }) => {
  try {
    const { data } = await stockAPI.post(`/api/dividends`, {
      dividendDate,
      amount,
      stockId,
    });
    return data;
  } catch (err) {
    console.log(`Create Dividend Failed ${err}`);
  }
};

export const getDividendById = async (id) => {
  try {
    const { data } = await stockAPI.get(`/api/dividends/${id}`, {
      id,
    });
    return data;
  } catch (err) {
    console.log(`Get Dividend Failed ${err}`);
  }
};

export const editDividendById = async ({
  id,
  dividendDate,
  amount,
  stockId,
}) => {
  try {
    const { data } = await stockAPI.put(
      `/api/dividends/${id}`,
      {
        dividendDate,
        amount,
        stockId,
      },
      {
        id,
      }
    );
    return data;
  } catch (err) {
    console.log(`Edit Dividend Failed ${err}`);
  }
};

export const deleteDividendById = async (id) => {
  try {
    const { data } = await stockAPI.delete(`/api/dividends/${id}`, {
      id,
    });
    return data.success;
  } catch (err) {
    console.log(`Delete Dividend Failed ${err}`);
  }
};

// 用戶資料總整API
export const getRecapCost = async () => {
  try {
    const { data } = await stockAPI.get(`/api/recap/cost`);
    return data;
  } catch (err) {
    console.log(`Get Recap Failed ${err}`);
  }
};

export const getRecapDividend = async () => {
  try {
    const { data } = await stockAPI.get(`/api/recap/dividends`);
    return data;
  } catch (err) {
    console.log(`Get RecapDividend Failed ${err}`);
  }
};
