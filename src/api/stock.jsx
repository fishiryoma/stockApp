import axios from "axios";

const baseUrl = "";
const authorization = {
  headers: {
    Authorization: "Bearer Token",
  },
};

export const getNameBySymbol = async (symbol) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/${symbol}`, {
      Params: symbol,
      type: "String",
      description: "股票代號",
    });
    return data.stock;
  } catch (err) {
    console.log(`Get Stock Name Failed ${err}`);
  }
};

export const getInfoBySymbol = async (symbol) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/stocks/${symbol}`, {
      Params: symbol,
      Required: true,
      Type: "String",
      Description: "股票代號",
      authorization,
    });
    return data;
  } catch (err) {
    console.log(`Get Stock Info Failed ${err}`);
  }
};

export const createTransc = async ({
  date,
  isBuy,
  quantity,
  price,
  fee,
  note,
  symbol,
}) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/transactions`,
      {
        date,
        isBuy,
        quantity,
        pricePerUnit: price,
        fee,
        note,
        stockId: symbol,
      },
      authorization
    );
    return data;
  } catch (err) {
    console.log(`Create Transaction Failed ${err}`);
  }
};

export const getTranscById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/transactions/${id}`, {
      Params: id,
      Required: "required",
      Type: "integer",
      Description: "transaction id",
      authorization,
    });
    return data.transaction;
  } catch (err) {
    console.log(`Get Transaction Failed ${err}`);
  }
};

export const deleteTranscById = async (id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/api/transactions/${id}`, {
      Params: id,
      Required: "required",
      Type: "integer",
      Description: "transaction id",
      authorization,
    });
    return data.success;
  } catch (err) {
    console.log(`Delete Transaction Failed ${err}`);
  }
};

export const createDividend = async ({ date, amount, symbol }) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/dividends`,
      {
        date,
        amount,
        stockId: symbol,
      },
      authorization
    );
    return data.dividend;
  } catch (err) {
    console.log(`Create Dividend Failed ${err}`);
  }
};

export const getDividendById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/dividends/${id}`, {
      Params: id,
      Required: "required",
      Type: "integer",
      Description: "dividend id",
      authorization,
    });
    return data.dividend;
  } catch (err) {
    console.log(`Get Dividend Failed ${err}`);
  }
};

export const editDividendById = async ({ id, date, amount, symbol }) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/dividends/${id}`,
      {
        dividendDate: date,
        amount,
        stockId: symbol,
      },
      {
        Params: id,
        Required: "required",
        Type: "integer",
        Description: "dividend id",
        authorization,
      }
    );
    return data.dividend;
  } catch (err) {
    console.log(`Edit Dividend Failed ${err}`);
  }
};

export const deleteDividendById = async (id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/api/dividends/${id}`, {
      Params: id,
      Required: "required",
      Type: "integer",
      Description: "dividend id",
      authorization,
    });
    return data.success;
  } catch (err) {
    console.log(`Delete Dividend Failed ${err}`);
  }
};
