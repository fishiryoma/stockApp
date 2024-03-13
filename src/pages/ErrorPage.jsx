import errorImg from "../../public/error.svg";
import { Container } from "../componenets/Container";

export default function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <Container className="mt-0 errorlanding h-screen">
      <div className="flex flex-col items-center bg-white bg-opacity-90 py-10 px-16 rounded">
        <img src={errorImg} alt="error icon" className="w-32" />
        <p className="m-6 text-5xl">發生了一些未知的錯誤</p>
        <p className="m-3 text-4xl">{error.message}</p>
        <button
          className="btn btn-neutral btn-lg text-2xl mt-8 w-full max-w-xl"
          onClick={resetErrorBoundary}
        >
          <p>再試一次</p>
        </button>
      </div>
    </Container>
  );
}
