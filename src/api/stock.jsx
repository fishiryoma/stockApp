import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://stockproject-dev.ap-northeast-1.elasticbeanstalk.com";

const stockAPI = axios.create({
  baseURL: baseUrl,
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
    console.log(err);
  }
);

// 驗證股票代碼是否正確
export const getNameBySymbol = async (symbol) => {
  try {
    const { data } = await stockAPI.post(`/api/symbol`, {
      symbol,
    });
    // console.log(data);
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

// 個股資料統整
export const getTranscByStockId = async (id, page = 1) => {
  try {
    const { data } = await stockAPI.get(
      `/api/stocks/${id}/transactions?page=${page}`
    );
    return data;
  } catch (err) {
    console.log(`Get RecapTransaction Failed ${err}`);
  }
};
export const getDividendByStockId = async (id, page = 1) => {
  try {
    const { data } = await stockAPI.get(
      `/api/stocks/${id}/dividends?page=${page}`
    );
    return data;
  } catch (err) {
    console.log(`Get Recap Dividend Failed ${err}`);
  }
};

// 新增、刪除交易紀錄
export const createTransc = async ({
  stockId,
  pricePerUnit,
  quantity,
  transDate,
  fee,
  note,
  isBuy,
}) => {
  console.log({
    stockId,
    pricePerUnit,
    quantity,
    transDate,
    fee,
    note,
    isBuy,
  });
  try {
    const { data } = await stockAPI.post(`/api/transactions`, {
      stockId,
      pricePerUnit,
      quantity,
      transDate,
      fee,
      note,
      isBuy,
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

export const getRecapDiagram = async (period) => {
  try {
    const { data } = await stockAPI.post("/api/recap/recap-diagram", {
      period,
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.log(`Get RecapDiagram Failed ${err}`);
  }
};

export const getRecapMargin = async () => {
  try {
    const { data } = await stockAPI.get("/api/recap/margin");
    // console.log(data);
    return data;
  } catch (err) {
    console.log(`Get RecapMargin Failed ${err}`);
  }
};
