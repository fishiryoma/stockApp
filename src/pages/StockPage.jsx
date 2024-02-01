import AllTransaction from "../componenets/AllTransaction";
import AllDividend from "../componenets/AllDividend";
import StockSumTable from "../componenets/StockSumTable";
import StockChart from "../componenets/StockChart";
import { Container } from "../componenets/Container";
import { useStock } from "../hooks/useStock";

const transactions = [
  {
    id: 7,
    transDate: "2023-03-14",
    isBuy: true,
    quantity: 1000,
    pricePerUnit: 68,
    fee: 35,
    note: null,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:40:43.000Z",
    updatedAt: "2024-01-26T15:40:43.000Z",
  },
  {
    id: 6,
    transDate: "2023-02-13",
    isBuy: false,
    quantity: 1000,
    pricePerUnit: 69.6,
    fee: 105,
    note: null,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:39:25.000Z",
    updatedAt: "2024-01-26T15:39:25.000Z",
  },
  {
    id: 5,
    transDate: "2022-10-17",
    isBuy: true,
    quantity: 1000,
    pricePerUnit: 57,
    fee: 30,
    note: null,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:34:28.000Z",
    updatedAt: "2024-01-26T15:34:28.000Z",
  },
  {
    id: 8,
    transDate: "2022-08-01",
    isBuy: true,
    quantity: 1000,
    pricePerUnit: 67.9,
    fee: 35,
    note: null,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:33:49.000Z",
    updatedAt: "2024-01-26T15:33:49.000Z",
  },
];

const dividends = [
  {
    id: 1,
    dividendDate: "2023-11-16",
    amount: 0.861,
    sharesHold: 2000,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:28:15.000Z",
    updatedAt: "2024-01-26T16:26:19.000Z",
  },
  {
    id: 3,
    dividendDate: "2023-07-18",
    amount: 1.352,
    sharesHold: 2000,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:27:56.000Z",
    updatedAt: "2024-01-26T16:25:52.000Z",
  },
  {
    id: 2,
    dividendDate: "2022-11-16",
    amount: 1.03,
    sharesHold: 2000,
    userId: 1,
    stockId: 6,
    createdAt: "2024-01-26T15:27:31.000Z",
    updatedAt: "2024-01-26T15:34:28.000Z",
  },
];

const abstract = {
  sharesHold: 2000,
  totalCost: 123505,
  accIncome: 6486,
  avgCost: 58.5095,
  totalReturn: -117019,
};

function StockPage({ stock }) {
  const { stockBtn } = useStock();
  const renderedStock = stock ? stock : stockBtn;
  return (
    <Container className="bg-gray-800 text-white">
      <p className="text-3xl mb-8 2xl:ml-10">{`${renderedStock.symbol} ${renderedStock.name}`}</p>
      <div className="grid gap-10 sm:gap-20 lg:grid-rows-2 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-4 lg:items-center">
        <div className="lg:col-start-2 lg:row-start-1 w-full ">
          <StockSumTable datas={abstract} />
        </div>
        <StockChart datas={dividends} />
        <div className="lg:col-start-1 lg:row-start-1 mx-auto lg:w-full flex justify-center">
          <AllTransaction datas={transactions} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 flex justify-center">
          <AllDividend datas={dividends} />
        </div>
      </div>
    </Container>
  );
}

export default StockPage;
